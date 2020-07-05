import * as Yup from 'yup';
import DeliveryProblems from '../models/DeliveryProblems';
import Package from '../models/Package';
import Deliverer from '../models/Deliverer';
import Recipient from '../models/Recipient';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    if (req.params.id) {
      const deliveryProblems = await DeliveryProblems.findAll({
        where: {
          package_id: req.params.id,
        },
      });

      if (!(deliveryProblems.length > 0)) {
        return res
          .status(400)
          .json({ error: 'This package does not have problems.' });
      }

      return res.json(deliveryProblems);
    }

    const deliveryProblems = await DeliveryProblems.findAll({
      order: [['id', 'ASC']],
      limit: 6,
      offset: (page - 1) * 6,
    });

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const package_id = req.params.id;

    /**
     * Check if package exist
     */

    const pckg = await Package.findByPk(package_id);

    if (!pckg) {
      return res.status(400).json({ error: 'Package does not exist.' });
    }

    const { description } = req.body;

    const delivery_problem = await DeliveryProblems.create({
      package_id,
      description,
    });

    return res.json(delivery_problem);
  }

  async delete(req, res) {
    const problem_id = req.params.id;

    const delivery_problem = await DeliveryProblems.findByPk(problem_id);

    if (!delivery_problem) {
      return res
        .status(400)
        .json({ error: 'There is not a problem with this id.' });
    }

    const { package_id } = delivery_problem;

    const pckg = await Package.findByPk(package_id);

    pckg.canceled_at = new Date();

    await pckg.save();

    /**
     * Send email
     */

    const recipient = await Recipient.findByPk(pckg.recipient_id);
    const deliverer = await Deliverer.findByPk(pckg.deliverer_id);

    const mail = {
      product: pckg.product,
      recipient: {
        name: recipient.name,
      },
      deliverer: {
        name: deliverer.name,
        email: deliverer.email,
      },
      problem: delivery_problem.description,
    };

    await Queue.add(CancellationMail.key, {
      mail,
    });

    await delivery_problem.destroy();

    return res.json();
  }
}

export default new DeliveryProblemsController();
