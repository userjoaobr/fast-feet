import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliverers/${id}`);

    const deliverer = response.data;

    if (!deliverer) {
      Alert.alert('Erro', 'ID de cadastro inválido.');
      yield put(signFailure());
      return;
    }
    deliverer.createdAt = format(parseISO(deliverer.createdAt), 'dd/MM/yyyy');
    yield put(signInSuccess(deliverer));
  } catch (e) {
    Alert.alert('Falha na autenticação', 'Verifique os dados fornecidos.');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
