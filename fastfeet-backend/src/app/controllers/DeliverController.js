import * as Yup from 'yup';
import Package from '../models/Package';

class DeliverController {
  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const { signature_id } = req.body;

    const pckg = await Package.findByPk(req.params.id);

    if (!pckg) {
      return res.status(400).json({ error: 'Package does not exist.' });
    }

    if (pckg.start_date === null) {
      return res.status(400).json({ error: 'Package is not picked up yet.' });
    }

    if (pckg.end_date !== null) {
      return res.status(400).json({ error: 'Package is already delivered.' });
    }

    pckg.end_date = new Date();
    pckg.signature_id = signature_id;

    await pckg.save();

    return res.json(pckg);
  }
}

export default new DeliverController();
