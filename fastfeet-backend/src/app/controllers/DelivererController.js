import { Op } from 'sequelize';
import * as Yup from 'yup';
import Deliverer from '../models/Deliverer';
import File from '../models/File';
import Package from '../models/Package';

class DelivererController {
  async index(req, res) {
    const { q, page = 1 } = req.query;
    const { id } = req.params;

    if (id) {
      const deliverer = await Deliverer.findByPk(id, {
        attributes: ['id', 'name', 'email', 'avatar_id', 'createdAt'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        ],
      });
      return res.json(deliverer);
    }

    if (!q) {
      const deliverers = await Deliverer.findAll({
        attributes: ['id', 'name', 'email', 'avatar_id'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        ],
        order: [['id', 'ASC']],
        limit: 6,
        offset: (page - 1) * 6,
      });
      return res.json(deliverers);
    }

    const deliverers = await Deliverer.findAll({
      where: {
        name: {
          [Op.iLike]: q,
        },
      },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
      order: [['id', 'ASC']],
      limit: 6,
      offset: (page - 1) * 6,
    });

    return res.json(deliverers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const delivererExists = await Deliverer.findOne({
      where: { email: req.body.email },
    });

    if (delivererExists) {
      return res.status(400).json({ error: 'Deliverer already exists.' });
    }

    const { id, name, email } = await Deliverer.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const { email } = req.body;

    const deliverer = await Deliverer.findByPk(req.params.id);

    if (!deliverer) {
      return res.status(400).json({ error: "Deliverer doesn't exists." });
    }

    if (email && email !== deliverer.email) {
      const delivererExists = await Deliverer.findOne({
        where: { email },
      });

      if (delivererExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    const { id, name } = await deliverer.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const deliverer = await Deliverer.findByPk(req.params.id);

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer does not exist.' });
    }

    /**
     * Check if deliverer is related to a package
     */

    const pck = await Package.findAll({
      where: {
        deliverer_id: req.params.id,
      },
    });

    if (pck) {
      return res.status(400).json({
        error: 'There is one or more pending package for this deliverer.',
      });
    }

    await deliverer.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new DelivererController();
