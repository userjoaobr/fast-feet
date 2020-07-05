import Package from '../models/Package';
import Deliverer from '../models/Deliverer';
import Recipient from '../models/Recipient';
import File from '../models/File';

class ListDeliveriesController {
  async index(req, res) {
    const deliverer_id = req.params.id;

    const deliverer = await Deliverer.findByPk(deliverer_id);

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer does not exist.' });
    }
    const packages = await Package.findAll({
      where: {
        deliverer_id,
        canceled_at: null,
        end_date: null,
      },
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
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
}

export default new ListDeliveriesController();
