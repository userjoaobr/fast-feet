import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch, MdCreate, MdDelete } from 'react-icons/md';
import api from '~/services/api';
import {
  Container,
  ActionsList,
  ActionsContainer,
  ActionsButton,
  ActionsMore,
  AddPackage,
  NavPage,
  NavPageButton,
} from './styles';
import SearchInput from '~/components/SearchInput';
import NameIcon from '~/components/NameIcon';
import randomColor from '~/util/randomColor';

export default function Deliverers() {
  const [deliverers, setDeliverers] = useState([]);
  const [delivererSearch, setDelivererSearch] = useState('');
  const [page, setPage] = useState(1);

  async function loadDeliverers(dlv) {
    const response = await api.get('/deliverers', {
      params: {
        q: dlv,
        page,
      },
    });

    const data = response.data.map((deliverer) => {
      const color = randomColor();
      const actions = false;

      return {
        ...deliverer,
        color,
        actions,
      };
    });

    setDeliverers(data);
  }

  useEffect(() => {
    loadDeliverers();
  }, [page]);

  async function handleSearch(e) {
    setPage(1);
    e.preventDefault();
    setDelivererSearch(e.target.value);

    loadDeliverers(e.target.value);
  }

  function handleVisible(id) {
    setDeliverers(
      deliverers.map((deliverer) => ({
        ...deliverer,
        actions: deliverer.id === id ? !deliverer.actions : false,
      }))
    );
  }

  function handleActionsUnvisible() {
    setDeliverers(
      deliverers.map((deliverer) => ({
        ...deliverer,
        actions: false,
      }))
    );
  }

  async function handleDelete(id) {
    const confirm = window.confirm('Clique em OK para excluir o entregador!');
    handleActionsUnvisible();
    if (!confirm) {
      return;
    }

    try {
      await api.delete(`/deliverers/${id}`);
      loadDeliverers();
      toast.success('Entregador removido com sucesso!');
    } catch (e) {
      toast.error(
        'Falha na remoção solicitada! Provavelmente esse entregador está associado a uma entrega.'
      );
    }
  }

  return (
    <Container>
      <h2>Gerenciando entregadores</h2>
      <div>
        <SearchInput
          icon={MdSearch}
          placeholder="Busca por entregadores"
          value={delivererSearch}
          onChange={handleSearch}
        />
        <AddPackage to="/deliverers/addDeliverer">
          <MdAdd size={24} color="#fff" />
          <strong>CADASTRAR</strong>
        </AddPackage>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {!!deliverers &&
            deliverers.map((deliverer) => (
              <tr key={deliverer.id}>
                <td>
                  #
                  {String(deliverer.id).length < 2
                    ? `0${deliverer.id}`
                    : deliverer.id}
                </td>
                <td>
                  <NameIcon name={deliverer.name} color={deliverer.color} />
                </td>
                <td>{deliverer.name}</td>
                <td>{deliverer.email}</td>
                <td>
                  <ActionsContainer>
                    <ActionsMore
                      type="button"
                      onClick={() => handleVisible(deliverer.id)}
                    >
                      ...
                    </ActionsMore>
                    <ActionsList visible={deliverer.actions}>
                      <div>
                        <Link to={`/deliverers/editDeliverer/${deliverer.id}`}>
                          <ActionsButton type="button">
                            <MdCreate size={14} color="#4d85ee" />
                            Editar
                          </ActionsButton>
                        </Link>

                        <hr />
                        <ActionsButton
                          type="button"
                          onClick={() => handleDelete(deliverer.id)}
                        >
                          <MdDelete size={14} color="#de3b3b" />
                          Excluir
                        </ActionsButton>
                      </div>
                    </ActionsList>
                  </ActionsContainer>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <NavPage>
        <NavPageButton
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          type="button"
        >
          {'<'} voltar
        </NavPageButton>
        <span>-{page}-</span>
        <NavPageButton
          disabled={deliverers.length < 6}
          type="button"
          onClick={() => setPage(page + 1)}
        >
          próximo {'>'}
        </NavPageButton>
      </NavPage>
    </Container>
  );
}
