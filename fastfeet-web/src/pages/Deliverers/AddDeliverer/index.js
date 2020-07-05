import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { MdArrowBack, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import Input from '~/components/Input';
import api from '~/services/api';
import { Container, Button, Unform } from './styles';
import history from '~/services/history';
import AvatarInput from '~/components/AvatarInput';

export default function AddDeliverer() {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Informe um email válido.')
          .required('O email é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const dataFile = new FormData();

      dataFile.append('file', data.avatar);

      const responseFile = data.avatar
        ? await api.post('files', dataFile)
        : null;

      await api.post('/deliverers', {
        name: data.name,
        email: data.email,
        avatar_id: responseFile?.data?.id,
      });

      toast.success('Entregador cadastrado com sucesso!');
      history.push('/deliverers');
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
        <h2>Cadastro de entregadores</h2>
        <div>
          <Link to="/deliverers">
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
        <AvatarInput name="avatar" />
        <section>
          <Input
            label="Nome"
            name="name"
            type="text"
            placeholder="Digite o nome do entregador"
            onKeyPress={(e) =>
              e.key === 'Enter' ? formRef.current.submitForm() : null
            }
          />
          <Input
            label="Email"
            name="email"
            type="text"
            placeholder="Digite o email do entregador"
            onKeyPress={(e) =>
              e.key === 'Enter' ? formRef.current.submitForm() : null
            }
          />
        </section>
      </Unform>
    </Container>
  );
}
