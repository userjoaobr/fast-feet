import React, { useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { MdArrowBack, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import Input from '~/components/Input';
import api from '~/services/api';
import { Container, Button, Unform } from './styles';
import history from '~/services/history';
import InputMask from '~/components/InputMask';

export default function EditRecipient() {
  const formRef = useRef(null);
  const { id } = useParams();

  async function loadRecipient() {
    const response = await api.get(`/recipients/${id}`);

    const recipient = response.data;
    formRef.current.setData(recipient);
  }

  useEffect(() => {
    loadRecipient();
  }, [id]);

  async function handleSubmit(data) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        address_street: Yup.string().required('Rua/Avenida é obrigatório'),
        address_number: Yup.string().required('Número é obrigatório'),
        address_complement: Yup.string().required('Complemento é obrigatório'),
        city: Yup.string().required('Cidade é obrigatório'),
        state: Yup.string().required('Estado é obrigatório'),
        zip_code: Yup.string().required('CEP é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/recipients/${id}`, {
        name: data.name,
        address_street: data.address_street,
        address_number: data.address_number,
        address_complement: data.address_complement,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
      });

      toast.success('Destinatário alterado com sucesso!');
      history.push('/recipients');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
      toast.error('Cadastro inválido. Verifique os dados fornecidos!');
    }
  }

  return (
    <Container>
      <div>
        <h2>Edição de destinarários</h2>
        <div>
          <Link to="/recipients">
            <Button onClick color="#999999">
              <MdArrowBack size={24} color="#fff" />
              VOLTAR
            </Button>
          </Link>

          <Button onClick={() => formRef.current.submitForm()} color="#7d40e7">
            <MdDone size={24} color="#fff" />
            SALVAR
          </Button>
        </div>
      </div>
      <Unform ref={formRef} onSubmit={handleSubmit}>
        <Input label="Nome" name="name" type="text" placeholder="" />
        <div>
          <Input
            label="Rua/Avenida"
            name="address_street"
            type="text"
            placeholder=""
          />
          <Input
            label="Número"
            name="address_number"
            type="text"
            placeholder=""
          />
          <Input
            label="Complemento"
            name="address_complement"
            type="text"
            placeholder=""
          />
        </div>
        <div>
          <Input label="Cidade" name="city" type="text" placeholder="" />
          <Input label="Estado" name="state" type="text" placeholder="" />
          <InputMask
            label="CEP"
            name="zip_code"
            mask="99999-999"
            maskPlaceholder={null}
            placeholder="_____-___"
            onKeyPress={(e) =>
              e.key === 'Enter' ? formRef.current.submitForm() : null
            }
          />
        </div>
      </Unform>
    </Container>
  );
}
