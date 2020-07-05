import Mail from '../../lib/Mail';

class NewPackageMail {
  get key() {
    return 'NewPackageMail';
  }

  async handle({ data }) {
    const { mail } = data;

    await Mail.sendMail({
      to: `${mail.deliverer.name} <${mail.deliverer.email}>`,
      subject: 'Nova Encomenda',
      template: 'newPackage',
      context: {
        deliverer: mail.deliverer.name,
        recipient: mail.recipient.name,
        product: mail.product,
      },
    });
  }
}

export default new NewPackageMail();
