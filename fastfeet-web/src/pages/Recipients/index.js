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

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [recipientSearch, setRecipientSearch] = useState('');
  const [page, setPage] = useState(1);

  async function loadRecipients(dlv) {
    const response = await api.get('/recipients', {
      params: {
        q: dlv,
        page,
      },
    });

    const data = response.data.map((recipient) => {
      return {
        ...recipient,
        full_address: `${recipient.address_street} ${recipient.address_number} ${recipient.address_complement}, ${recipient.city}-${recipient.state}`,
      };
    });

    setRecipients(data);
  }

  useEffect(() => {
    loadRecipients();
  }, [page]);

  async function handleSearch(e) {
    setPage(1);
    e.preventDefault();
    setRecipientSearch(e.target.value);

    loadRecipients(e.target.value);
  }

  function handleVisible(id) {
    setRecipients(
      recipients.map((recipient) => ({
        ...recipient,
        actions: recipient.id === id ? !recipient.actions : false,
      }))
    );
  }

  function handleActionsUnvisible() {
    setRecipients(
      recipients.map((recipient) => ({
        ...recipient,
        actions: false,
      }))
    );
  }

  async function handleDelete(id) {
    handleActionsUnvisible();

    const confirm = window.confirm('Clique em OK para excluir o entregador!');

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`/recipients/${id}`);
      loadRecipients();
      toast.success('Entregador removido com sucesso!');
    } catch (e) {
      toast.error(
        'Falha na remoção solicitada! Provavelmente esse entregador está associado a uma entrega.'
      );
    }
  }

  return (
    <Container>
      <h2>Gerenciando destinatários</h2>
      <div>
        <SearchInput
          icon={MdSearch}
          placeholder="Busca por destinatários"
          value={recipientSearch}
          onChange={handleSearch}
        />
        <AddPackage to="/recipients/addRecipient">
          <MdAdd size={24} color="#fff" />
          <strong>CADASTRAR</strong>
        </AddPackage>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {!!recipients &&
            recipients.map((recipient) => (
              <tr key={recipient.id}>
                <td>
                  #
                  {String(recipient.id).length < 2
                    ? `0${recipient.id}`
                    : recipient.id}
                </td>
                <td>{recipient.name}</td>
                <td>{recipient.full_address}</td>
                <td>
                  <ActionsContainer>
                    <ActionsMore
                      type="button"
                      onClick={() => handleVisible(recipient.id)}
                    >
                      ...
                    </ActionsMore>
                    <ActionsList visible={recipient.actions}>
                      <div>
                        <Link to={`/recipients/editRecipient/${recipient.id}`}>
                          <ActionsButton type="button">
                            <MdCreate size={14} color="#4d85ee" />
                            Editar
                          </ActionsButton>
                        </Link>

                        <hr />
                        <ActionsButton
                          type="button"
                          onClick={() => handleDelete(recipient.id)}
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
          disabled={recipients.length < 6}
          type="button"
          onClick={() => setPage(page + 1)}
        >
          próximo {'>'}
        </NavPageButton>
      </NavPage>
    </Container>
  );
}
