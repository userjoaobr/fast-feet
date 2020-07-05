import {
  isAfter,
  isBefore,
  setSeconds,
  setMinutes,
  setHours,
  startOfDay,
  endOfDay,
} from 'date-fns';
import * as Yup from 'yup';
import { Op } from 'sequelize';
import Package from '../models/Package';
import Deliverer from '../models/Deliverer';

class PickupController {
  async update(req, res) {
    const schema = Yup.object().shape({
      deliverer_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const { deliverer_id } = req.body;

    const deliverer = await Deliverer.findByPk(deliverer_id);

    if (!deliverer) {
      return res
        .status(401)
        .json({ error: 'Only deliverers can pick up a package.' });
    }

    const pckg = await Package.findByPk(req.params.id);

    if (!pckg) {
      return res.status(400).json({ error: 'Package does not exist.' });
    }

    if (pckg.start_date !== null) {
      return res.status(400).json({ error: 'Package already picked up.' });
    }

    if (deliverer_id !== pckg.deliverer_id) {
      return res.status(401).json({
        error:
          'Deliverer is not authorized to pick up or deliver this package.',
      });
    }

    const date = Number(new Date());

    const countDeliveries = await Package.findAndCountAll({
      where: {
        deliverer_id,
        start_date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
    });

    if (countDeliveries.count >= 5) {
      return res
        .status(401)
        .json({ error: 'Deliverer can only pick up 5 packages per day.' });
    }

    const pickup_isBefore = isBefore(
      new Date(),
      setSeconds(setMinutes(setHours(date, 6), 0), 0)
    );
    const pickup_isAfter = isAfter(
      new Date(),
      setSeconds(setMinutes(setHours(date, 18), 0), 0)
    );

    // if (pickup_isBefore || pickup_isAfter) {
    //   return res.status(401).json({
    //     error: 'Pick up package is only permitted between 08h and 18h',
    //   });
    // }

    pckg.start_date = new Date();

    await pckg.save();

    return res.json(pckg);
  }
}

export default new PickupController();
