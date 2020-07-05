import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { mail } = data;

    await Mail.sendMail({
      to: `${mail.deliverer.name} <${mail.deliverer.email}>`,
      subject: 'Encomenda Cancelada',
      template: 'cancellation',
      context: {
        deliverer: mail.deliverer.name,
        recipient: mail.recipient.name,
        problem: mail.problem,
        product: mail.product,
      },
    });
  }
}

export default new CancellationMail();
