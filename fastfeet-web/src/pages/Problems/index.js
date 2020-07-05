import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdVisibility, MdDelete } from 'react-icons/md';
import Modal from 'react-modal';
import history from '~/services/history';
import api from '~/services/api';
import {
  Container,
  ActionsList,
  ActionsContainer,
  ActionsButton,
  ActionsMore,
  ModalContent,
  NavPage,
  NavPageButton,
} from './styles';
import { customStyles } from '~/styles/modal';

Modal.setAppElement('#root');

export default function Packages() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showPackageId, setShowProblemId] = useState('');

  async function loadProblems() {
    const response = await api.get('/delivery/problems', {
      params: {
        page,
      },
    });

    const data = response.data.map((problem) => ({
      ...problem,
      actions: false,
    }));

    setProblems(data);
  }

  useEffect(() => {
    loadProblems();
  }, [page]);

  function handleVisible(id) {
    setProblems(
      problems.map((problem) => ({
        ...problem,
        actions: problem.id === id ? !problem.actions : false,
      }))
    );
  }

  function handleActionsUnvisible() {
    setProblems(
      problems.map((problem) => ({
        ...problem,
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
    setShowProblemId(id);
    handleVisible(id);
  }

  async function handleCancelDelivery(id) {
    handleActionsUnvisible();
    const confirm = window.confirm(
      'Clique em OK para cancelar a encomenda associada a esse problema!'
    );

    if (!confirm) {
      return;
    }

    try {
      await api.delete(`/problem/${id}/cancel-delivery`);

      loadProblems();
      toast.success('Encomenda cancelada com sucesso!');
      history.push('/packages');
    } catch (e) {
      toast.error('Falha na solicitação!');
    }
  }

  return (
    <Container>
      <h2>Problemas na Entrega</h2>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel=""
      >
        <ModalContent>
          {modalIsOpen &&
            problems.map((problem) =>
              problem.id === showPackageId ? (
                <>
                  <strong>Visualizar Problema</strong>
                  <p>{problem.description}</p>
                </>
              ) : null
            )}
        </ModalContent>
      </Modal>
      <table>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {!!problems &&
            problems.map((problem) => (
              <tr key={problem.id}>
                <td>
                  #
                  {String(problem.package_id).length < 2
                    ? `0${problem.package_id}`
                    : problem.package_id}
                </td>
                <td>
                  <div>{problem.description}</div>
                </td>
                <td>
                  <ActionsContainer>
                    <ActionsMore
                      type="button"
                      onClick={() => handleVisible(problem.id)}
                    >
                      ...
                    </ActionsMore>
                    <ActionsList visible={problem.actions}>
                      <div>
                        <ActionsButton
                          type="button"
                          onClick={() => handleShowPackage(problem.id)}
                        >
                          <MdVisibility size={14} color="#7D40E7" />
                          Visualizar
                        </ActionsButton>
                        <hr />
                        <ActionsButton
                          type="button"
                          onClick={() => handleCancelDelivery(problem.id)}
                        >
                          <MdDelete size={14} color="#de3b3b" />
                          Cancelar Encomenda
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
          disabled={problems.length < 6}
          type="button"
          onClick={() => setPage(page + 1)}
        >
          próximo {'>'}
        </NavPageButton>
      </NavPage>
    </Container>
  );
}
