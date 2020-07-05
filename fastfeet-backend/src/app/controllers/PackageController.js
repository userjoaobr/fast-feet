import { Op } from 'sequelize';
import * as Yup from 'yup';
import Package from '../models/Package';
import Deliverer from '../models/Deliverer';
import Recipient from '../models/Recipient';
import File from '../models/File';
import NewPackageMail from '../jobs/NewPackageMail';
import Queue from '../../lib/Queue';

class PackageController {
  async index(req, res) {
    const { q, page = 1 } = req.query;
    const { id } = req.params;

    if (id) {
      const packages = await Package.findByPk(id, {
        include: [
          {
            model: File,
            as: 'signature',
            attributes: ['name', 'path', 'url'],
          },
          {
            model: Deliverer,
            as: 'deliverer',
            attributes: ['name'],
          },
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'name',
              'city',
              'state',
              'address_street',
              'address_number',
              'address_complement',
              'zip_code',
            ],
          },
        ],
      });
      return res.json(packages);
    }

    if (!q) {
      const packages = await Package.findAll({
        include: [
          {
            model: File,
            as: 'signature',
            attributes: ['name', 'path', 'url'],
          },
          {
            model: Deliverer,
            as: 'deliverer',
            attributes: ['name'],
          },
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'name',
              'city',
              'state',
              'address_street',
              'address_number',
              'address_complement',
              'zip_code',
            ],
          },
        ],
        order: [['id', 'ASC']],
        limit: 6,
        offset: (page - 1) * 6,
      });
      return res.json(packages);
    }
    const packages = await Package.findAll({
      where: {
        product: {
          [Op.iLike]: q,
        },
      },
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Deliverer,
          as: 'deliverer',
          attributes: ['name'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'city',
            'state',
            'address_street',
            'address_number',
            'address_complement',
            'zip_code',
          ],
        },
      ],
      order: [['id', 'ASC']],
      limit: 6,
      offset: (page - 1) * 6,
    });
    return res.json(packages);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliverer_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const { product, recipient_id, deliverer_id } = req.body;

    /**
     * Check if recipient and deliverer exist
     */

    const recipient = await Recipient.findOne({
      where: {
        id: recipient_id,
      },
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient is not valid' });
    }

    const deliverer = await Deliverer.findOne({
      where: {
        id: deliverer_id,
      },
    });

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer is not valid' });
    }

    const new_package = await Package.create({
      product,
      recipient_id,
      deliverer_id,
    });

    /**
     * Send email
     */

    const mail = {
      product,
      recipient: {
        name: recipient.name,
      },
      deliverer: {
        name: deliverer.name,
        email: deliverer.email,
      },
    };

    await Queue.add(NewPackageMail.key, {
      mail,
    });

    return res.json(new_package);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      deliverer_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const { deliverer_id, recipient_id } = req.body;

    const deliverer = await Deliverer.findByPk(deliverer_id);

    if (!deliverer) {
      return res
        .status(401)
        .json({ error: 'Only deliverers can deliver a package.' });
    }

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(401).json({ error: 'This recipient does not exist' });
    }

    const pckg = await Package.findByPk(req.params.id);

    if (!pckg) {
      return res.status(400).json({ error: 'Package does not exist.' });
    }

    await pckg.update(req.body);

    return res.json(pckg);
  }

  async delete(req, res) {
    const pckg = await Package.findByPk(req.params.id);

    if (!pckg) {
      return res.status(400).json({ error: 'Package does not exist.' });
    }

    await pckg.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new PackageController();
