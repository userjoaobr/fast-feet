import React from 'react';
import PropTypes from 'prop-types';
import { Container, Circle } from './styles';

const statusColors = {
  ENTREGUE: ['rgba(44, 164, 43,1)', 'rgba(44, 164, 43,0.3)'],
  PENDENTE: ['rgba(193, 188, 53, 1)', 'rgba(193, 188, 53, 0.3)'],
  RETIRADA: ['rgba(77, 133, 238, 1)', 'rgba(77, 133, 238, 0.3)'],
  CANCELADA: ['rgba(222, 59, 59, 1)', 'rgba(222, 59, 59, 0.3)'],
};

export default function StatusSignal({ status }) {
  return (
    <Container
      color={statusColors[status][0]}
      backgroundColor={statusColors[status][1]}
    >
      <Circle color={statusColors[status][0]} />
      <strong>{status}</strong>
    </Container>
  );
}

StatusSignal.propTypes = {
  status: PropTypes.string.isRequired,
};
