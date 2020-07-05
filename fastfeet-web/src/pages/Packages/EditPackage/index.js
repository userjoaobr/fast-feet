import React, { useRef, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { MdArrowBack, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import AsyncInputSelect from '~/components/AsyncInputSelect';
import Input from '~/components/Input';
import api from '~/services/api';
import { Container, Button, Unform } from './styles';
import { customStylesSelectInput } from '~/styles/select';
import history from '~/services/history';

export default function EditPackage() {
  const formRef = useRef(null);
  const { id } = useParams();
  const [defaultValues, setDefaultValues] = useState([]);

  async function loadPackage() {
    const response = await api.get(`/packages/${id}`);

    const package_ = response.data;
    formRef.current.setData(package_);
    formRef.current.setFieldValue('recipient_id', {
      value: package_.recipient_id,
      label: package_.recipient.name,
    });
    formRef.current.setFieldValue('deliverer_id', {
      value: package_.deliverer_id,
      label: package_.deliverer.name,
    });

    setDefaultValues([package_.recipient.name, package_.deliverer.name]);
  }

  useEffect(() => {
    loadPackage();
  }, [id]);

  async function loadRecipientOptions(inputValue, callback) {
    const response = await api.get('/recipients', {
      params: {
        q: `%${inputValue}%`,
      },
    });

    const data = response.data.map((recipient) => ({
      value: recipient.id,
      label: recipient.name,
    }));

    callback(data);
  }

  async function loadDelivererOptions(inputValue, callback) {
    const response = await api.get('/deliverers', {
      params: {
        q: `%${inputValue}%`,
      },
    });

    const data = response.data.map((deliverer) => ({
      value: deliverer.id,
      label: deliverer.name,
    }));

    callback(data);
  }

  async function handleSubmit(data) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        product: Yup.string().required('O nome do produto é obrigatório'),
        recipient_id: Yup.string().required('O destinatário é obrigatório'),
        deliverer_id: Yup.string().required('O entregador é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/packages/${id}`, {
        product: data.product,
        recipient_id: data.recipient_id,
        deliverer_id: data.deliverer_id,
      });

      toast.success('Encomenda alterada com sucesso!');
      history.push('/packages');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
      toast.error('Alteração inválida. Verifique os dados fornecidos!');
    }
  }

  return (
    <Container>
      <div>
        <h2>Edição de encomendas</h2>
        <div>
          <Link to="/packages">
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
        <section>
          <AsyncInputSelect
            type="text"
            label="Destinatário"
            name="recipient_id"
            placeholder=""
            noOptionsMessage={() => 'Nenhum destinatário encontrado'}
            loadOptions={loadRecipientOptions}
            styles={customStylesSelectInput}
            defaultValue={defaultValues[0]}
          />
          <AsyncInputSelect
            type="text"
            label="Entregador"
            name="deliverer_id"
            placeholder=""
            noOptionsMessage={() => 'Nenhum entregador encontrado'}
            loadOptions={loadDelivererOptions}
            styles={customStylesSelectInput}
            defaultValue={defaultValues[1]}
          />
        </section>
        <Input
          label="Nome do produto"
          name="product"
          type="text"
          placeholder="Digite o nome do produto"
          onKeyPress={(e) =>
            e.key === 'Enter' ? formRef.current.submitForm() : null
          }
        />
      </Unform>
    </Container>
  );
}
