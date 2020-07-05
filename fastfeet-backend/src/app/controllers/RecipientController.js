import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import Package from '../models/Package';

class RecipientController {
  async index(req, res) {
    const { q, page = 1 } = req.query;
    const { id } = req.params;

    if (id) {
      const deliverer = await Recipient.findByPk(id);
      return res.json(deliverer);
    }

    if (!q) {
      const recipients = await Recipient.findAll({
        order: [['id', 'ASC']],
        limit: 6,
        offset: (page - 1) * 6,
      });
      return res.json(recipients);
    }

    const recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: q,
        },
      },
      order: [['id', 'ASC']],
      limit: 6,
      offset: (page - 1) * 6,
    });

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address_street: Yup.string().required(),
      address_number: Yup.string().required(),
      address_complement: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      address_street: Yup.string(),
      address_number: Yup.string(),
      address_complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zip_code: Yup.string(),
    });

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist.' });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const { name } = req.body;

    if (name && name !== recipient.name) {
      const recipientExists = await Recipient.findOne({
        where: { name },
      });

      if (recipientExists) {
        res
          .status(400)
          .json({ error: 'Another recipient exists with same name.' });
      }
    }

    await recipient.update(req.body);

    return res.json(recipient);
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Deliverer does not exist.' });
    }

    /**
     * Check if recipient is related to a package
     */

    const pck = await Package.findAll({
      where: {
        deliverer_id: req.params.id,
      },
    });

    if (pck) {
      return res.status(400).json({
        error: 'There is one or more pending package for this recipient.',
      });
    }

    await recipient.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new RecipientController();
