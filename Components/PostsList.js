import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

const PostsList = ({
  imagePost,
  pictureUserPost,
  commentPost,
  nameUser,
  userPostId,
  name,
}) => {
  console.log('hey PostsList', userPostId, name);

  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (isModalVisible) {
      <Modal />;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <Image style={styles.imagePost} source={{uri: imagePost}} />
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('profileOtherUser', {
              userPostId, //: data._data.userPostId,
              name, //: data._data.nameUser,
            })
          }>
          <Image
            style={styles.pictureUserPost}
            source={{uri: pictureUserPost}}
          />
        </TouchableOpacity>
        <View style={styles.mediaContentInfo}>
          <Text style={styles.commentPost}>{commentPost}</Text>
          <Text style={styles.nameUser}>{nameUser}</Text>
        </View>
      </View>
      <View style={{flex: 1, position: 'absolute'}}>
        <Modal
          deviceWidth={0.5}
          isVisible={isModalVisible}
          onSwipeComplete={() => setIsModalVisible(false)}
          swipeDirection="down"
          /* style={{marginTop: '100%'}} */
        >
          <View style={styles.containerModal}>
            {/* <View style={styles.infoUserModal}> */}
            <Image
              style={styles.pictureUserPostModal}
              source={{uri: pictureUserPost}}
            />
            <Text style={styles.nameUserModal}>{nameUser}</Text>
            {/* </View> */}
            <Image style={styles.imagePostModal} source={{uri: imagePost}} />
            {/* <TouchableOpacity style={styles.buttonLogout} onPress={exitSession}>
              <SignOutIcon name="logout" style={styles.logout} />
              <Text style={styles.textLogout}>Sign out</Text>
            </TouchableOpacity>
            <Divider style={{borderBottomWidth: 1, borderStyle: 'dashed'}} />
            <TouchableOpacity
              style={styles.buttonEditProfile}
              onPress={() => navigation.navigate('editProfile')}>
              <EditProfileIcon name="edit" style={styles.editProfile} />
              <Text style={styles.textEditProfile}>Edit profile</Text>
            </TouchableOpacity>
            <Divider style={{borderBottomWidth: 1, borderStyle: 'dashed'}} />
            <TouchableOpacity
              style={styles.buttonEditProfile}
              onPress={() => navigation.navigate('settings')}>
              <SettingsIcon name="settings" style={styles.editProfile} />
              <Text style={styles.textEditProfile}>Settings</Text>
            </TouchableOpacity> */}
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  imagePost: {
    width: 400,
    height: 400,
    alignSelf: 'center',
    //resizeMode: 'contain',
  },
  subContainer: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    //justifyContent: 'flex-start',
    alignSelf: 'center',
    //backgroundColor: 'green',
    //marginLeft:30,
    //marginTop:5
  },
  pictureUserPost: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  mediaContentInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  commentPost: {
    /* width: 50,
    height: 50, */
    color: '#000000',
    marginLeft: 10,
    marginTop: 10,
    //backgroundColor: 'blue',
  },
  nameUser: {
    /* width: 50,
    height: 50, */
    marginLeft: 10,
    color: '#000000',
    //backgroundColor: 'blue',
    //alignSelf: 'flex-end',
  },

  //MODAL
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.90)', // '#2a3638',
  },
  /* infoUserModal: {
    display: 'flex',
    flexDirection: 'row',
    //alignItems: 'center',
    //position: 'relative',
  }, */
  pictureUserPostModal: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
    alignContent: 'center',
    marginLeft: 10,
    position: 'absolute',
  },
  nameUserModal: {
    /* width: 50,
    height: 50, */
    marginLeft: 60,
    color: '#ffffff', //'#ffffff',
    fontFamily: 'Comfortaa-Regular',
    fontStyle: 'normal',
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: -0.24,
    lineHeight: 50,
    position: 'absolute',
  },
  imagePostModal: {
    width: '100%',
    height: '100%',
    //alignSelf: 'center',
    resizeMode: 'contain', //stretch
    //opacity: 0.5,
  },
});

export default PostsList;
