import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';

const ModalProfile = () => {
  //const [isModalVisible, setModalVisible] = useState(false);

  /* const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }; */
  return (
    <View style={{flex: 1}}>
      <Modal isVisible={true /* isModalVisible */}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

export default ModalProfile;
