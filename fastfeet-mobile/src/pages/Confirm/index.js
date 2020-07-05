import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, StatusBar, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { PropTypes } from 'prop-types';
import api from '~/services/api';

import {
  Container,
  Strip,
  ShadowProblemContainer,
  SignatureImage,
  SubmitButton,
  ButtonTake,
  ButtonDelete,
} from './styles';

const styles = StyleSheet.create({
  preview: {
    flex: 1,
  },
});

export default function Confirm({ navigation }) {
  const [image, setImage] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const delivery = navigation.getParam('delivery');
  const camera = useRef(null);

  async function loadPicture() {
    setPreviewURL(delivery?.signature?.url);
  }

  useEffect(() => {
    loadPicture();
  }, []);

  async function handleTakePicture() {
    setPreviewURL('');
    if (camera) {
      const options = {
        quality: 0.5,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
      };
      const data = await camera.current.takePictureAsync(options);

      setImage(data);
    }
  }

  async function handleSubmit() {
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: 'image/jpeg',
      name: `${image.uri}.jpg`,
    });

    const response = await api.post('files', formData);

    try {
      await api.put(`/packages/${delivery.id}/deliver`, {
        signature_id: response.data.id,
      });
      Alert.alert('Sucesso', 'Entrega confirmada!');
    } catch (e) {
      Alert.alert('Erro', 'Falha na confirmação da entrega.');
    }

    navigation.navigate('Dashboard');
  }

  function handleDeletePreview() {
    setPreviewURL('');
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Strip />
      <ShadowProblemContainer>
        {previewURL ? (
          <SignatureImage
            source={{
              uri: previewURL,
            }}
          />
        ) : (
          <RNCamera
            ref={camera}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            flashMode={RNCamera.Constants.FlashMode.off}
            captureAudio={false}
          />
        )}
      </ShadowProblemContainer>
      {previewURL
        ? !delivery.end_date && (
            <ButtonDelete onPress={handleDeletePreview}>
              <Icon name="delete" size={40} color="#fff" />
            </ButtonDelete>
          )
        : !delivery.end_date && (
            <ButtonTake onPress={handleTakePicture}>
              <Icon name="photo-camera" size={40} color="#fff" />
            </ButtonTake>
          )}
      {delivery.end_date ? null : (
        <SubmitButton onPress={handleSubmit} color="#7d40e7">
          Enviar
        </SubmitButton>
      )}
    </Container>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Confirmar entrega',
  headerTransparent: false,
  headerStyle: {
    backgroundColor: '#7d40e7',
    shadowColor: 'transparent',
  },
  headerTintColor: '#fff',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={24} color="#fff" />
    </TouchableOpacity>
  ),
});

Confirm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
