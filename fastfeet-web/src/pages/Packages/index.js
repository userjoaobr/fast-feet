import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  MdAdd,
  MdSearch,
  MdVisibility,
  MdCreate,
  MdDelete,
} from 'react-icons/md';
import Modal from 'react-modal';
import { format, parseISO } from 'date-fns';
import api from '~/services/api';
import {
  Container,
  ActionsList,
  ActionsContainer,
  ActionsButton,
  ActionsMore,
  ModalContent,
  AddPackage,
  NavPage,
  NavPageButton,
} from './styles';
import { customStyles } from '~/styles/modal';
import SearchInput from '~/components/SearchInput';
import NameIcon from '~/components/NameIcon';
import StatusSignal from '~/components/StatusSignal';
import randomColor from '~/util/randomColor';

Modal.setAppElement('#root');

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [packageSearch, setPackageSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showPackageId, setShowPackageId] = useState('');

  async function loadPackages(pck) {
    const response = await api.get('/packages', {
      params: {
        q: pck,
        page,
      },
    });

    const data = response.data.map((package_) => {
      const color = randomColor();
      const actions = false;

      if (package_.canceled_at !== null) {
        return {
          ...package_,
          status: 'CANCELADA',
          color,
          actions,
        };
      }
      if (package_.end_date !== null) {
        return {
          ...package_,
          status: 'ENTREGUE',
          color,
          actions,
        };
      }
      if (package_.start_date === null) {
        return {
          ...package_,
          status: 'PENDENTE',
          color,
          actions,
        };
      }
      return {
        ...package_,
        status: 'RETIRADA',
        color,
        actions,
      };
    });

    setPackages(data);
  }

  console.tron.log(packages);

  useEffect(() => {
    loadPackages();
  }, [page]);

  async function handleSearch(e) {
    setPage(1);
    e.preventDefault();
    setPackageSearch(e.target.value);

    loadPackages(e.target.value);
  }

  function handleVisible(id) {
    setPackages(
      packages.map((package_) => ({
        ...package_,
        actions: package_.id === id ? !package_.actions : false,
      }))
    );
  }

  function handleActionsUnvisible() {
    setPackages(
      packages.map((package_) => ({
        ...package_,
        actions: false,
      }))
    );
  }

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleShowPackage(id) {
    handleOpenModal();
    setShowPackageId(id);
    handleVisible(id);
  }

  async function handleDelete(id) {
    const confirm = window.confirm('Clique em OK para excluir a encomenda!');
    handleActionsUnvisible();
    if (!confirm) {
      return;
    }

    try {
      await api.delete(`/packages/${id}`);

      loadPackages();
      toast.success('Encomenda removida com sucesso!');
    } catch (e) {
      toast.success('Falha na solicitação!');
    }
  }

  return (
    <Container>
      <h2>Gerenciando encomendas</h2>
      <div>
        <SearchInput
          icon={MdSearch}
          placeholder="Busca por encomendas"
          value={packageSearch}
          onChange={handleSearch}
        />
        <AddPackage to="/packages/addPackage">
          <MdAdd size={24} color="#fff" />
          <strong>CADASTRAR</strong>
        </AddPackage>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel=""
      >
        <ModalContent>
          {modalIsOpen &&
            packages.map((package_) =>
              package_.id === showPackageId ? (
                <>
                  <strong>Informações sobre a encomenda</strong>
                  <span>
                    {package_.recipient.address_street}{' '}
                    {package_.recipient.address_number} ,{' '}
                    {package_.recipient.address_complement}
                  </span>
                  <span>
                    {package_.recipient.city} - {package_.recipient.state}
                  </span>
                  <span>{package_.recipient.zip_code}</span>
                  <hr />
                  <strong>Datas</strong>
                  <div>
                    <strong>Retirada:</strong>
                    <span>
                      {package_.start_date
                        ? format(parseISO(package_.start_date), 'dd/MM/yyyy')
                        : 'Pendente'}
                    </span>
                  </div>
                  <div>
                    <strong>Entrega:</strong>
                    <span>
                      {package_.end_date
                        ? format(parseISO(package_.end_date), 'dd/MM/yyyy')
                        : ''}
                    </span>
                  </div>
                  <hr />
                  <strong>Assinatura do destinatário</strong>
                  {package_.signature?.url ? (
                    <img src={package_.signature.url} alt="sign" />
                  ) : null}
                </>
              ) : null
            )}
        </ModalContent>
      </Modal>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Produto</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {!!packages &&
            packages.map((package_) => (
              <tr key={package_.id}>
                <td>
                  #
                  {String(package_.id).length < 2
                    ? `0${package_.id}`
                    : package_.id}
                </td>
                <td>
                  <NameIcon
                    name={package_.recipient.name}
                    color={package_.color}
                  />
                  {package_.recipient.name}
                </td>
                <td>{package_.deliverer.name}</td>
                <td>{package_.product}</td>
                <td>{package_.recipient.city}</td>
                <td>{package_.recipient.state}</td>
                <td>
                  <StatusSignal status={package_.status} />
                </td>
                <td>
                  <ActionsContainer>
                    <ActionsMore
                      type="button"
                      onClick={() => handleVisible(package_.id)}
                    >
                      ...
                    </ActionsMore>
                    <ActionsList visible={package_.actions}>
                      <div>
                        <ActionsButton
                          type="button"
                          onClick={() => handleShowPackage(package_.id)}
                        >
                          <MdVisibility size={14} color="#7D40E7" />
                          Visualizar
                        </ActionsButton>
                        <hr />
                        <Link to={`/packages/editPackage/${package_.id}`}>
                          <ActionsButton type="button">
                            <MdCreate size={14} color="#4d85ee" />
                            Editar
                          </ActionsButton>
                        </Link>

                        <hr />
                        <ActionsButton
                          type="button"
                          onClick={() => handleDelete(package_.id)}
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
          disabled={packages.length < 6}
          type="button"
          onClick={() => setPage(page + 1)}
        >
          próximo {'>'}
        </NavPageButton>
      </NavPage>
    </Container>
  );
}
