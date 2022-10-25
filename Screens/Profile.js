import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import useAuth from '../hooks/useAuth';
import SignOutIcon from 'react-native-vector-icons/MaterialIcons';
import EditProfileIcon from 'react-native-vector-icons/MaterialIcons';
import SettingsIcon from 'react-native-vector-icons/MaterialIcons';
import MenuModalIcon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {Button} from '@rneui/base';
import {Divider} from '@rneui/themed';

const notUserPhotoProfile = require('../assets/images/notUserPhotoProfile.jpg');

const Profile = ({navigation}) => {
  const {user} = useAuth();
  const [dataUser, setDataUser] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (isModalVisible) {
      <Modal />;
    }
  };

  useEffect(() => {
    const consultarPhotos = () => {
      firestore()
        .collection('posts')
        .where('userPostId', '==', user.uid)
        /* .get()
        .then */ .onSnapshot(querySnapshot => {
          setDataUser(querySnapshot.docs);
        });
    };
    consultarPhotos();
    const consultarUser = () => {
      firestore()
        .collection('users')
        .doc(user.uid)
        /* .get()
        .then */ .onSnapshot(documentSnapshot => {
          console.log('hey document', documentSnapshot.data());
          setUserInfo(documentSnapshot.data());
        });
    };
    consultarUser();
  }, [user.uid]);

  const exitSession = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('user has closed the session...');
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerProfile}>
          <TouchableOpacity
            style={styles.buttonModalOptions}
            onPress={toggleModal}>
            <MenuModalIcon name="md-menu-outline" style={styles.modalOptions} />
          </TouchableOpacity>
          <Image
            source={
              userInfo.photoURL ? {uri: userInfo.photoURL} : notUserPhotoProfile
            }
            style={styles.photoProfile}
          />
          <Text style={styles.nameUser}>{userInfo.name}</Text>
          <Text style={styles.addressUser}>{userInfo.city}</Text>
          {user.uid ? (
            <Text>{/* Your photos */}</Text>
          ) : (
            <>
              <TouchableOpacity style={styles.buttonFollow}>
                <Text style={styles.textButtonFollow}>Follow Geossephy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonMessage}
                onPress={() => console.log('message')}>
                <Text style={styles.textButtonMessage}>Message</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* {dataUser.map(image => { */}
        <ScrollView>
          <View style={styles.detailProfile}>
            {dataUser.length > 0 ? (
              dataUser.map(data => (
                <Image
                  key={data._data.id}
                  source={{uri: data._data.photoPostURL}}
                  style={styles.imagePost}
                />
              ))
            ) : (
              <Text style={styles.textNotPosts}>Not posts yet ✘...</Text>
            )}
          </View>
        </ScrollView>
        <View style={{flex: 1}}>
          <Modal
            deviceWidth={0.5}
            isVisible={isModalVisible}
            onSwipeComplete={() => setModalVisible(false)}
            swipeDirection="down"
            style={{marginTop: '100%'}}>
            <View style={styles.containerModal}>
              <Text style={styles.textModal}>Options</Text>
              <TouchableOpacity
                style={styles.buttonLogout}
                onPress={exitSession}>
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
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '87%',
    //backgroundColor: 'blue',
  },
  headerProfile: {
    width: '90%',
    height: '45%', //65% con los botones de follow y message
    //backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonModalOptions: {width: 30, height: 30, alignSelf: 'flex-end'},
  modalOptions: {fontSize: 30, color: '#000000'},

  photoProfile: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20,
    resizeMode: 'stretch',
  },
  nameUser: {
    width: 192,
    height: 40, //80,
    marginTop: 25,
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontFamily: 'Comfortaa-Regular',
    fontWeight: '400',
    fontSize: 25,
    letterSpacing: -0.24,
    lineHeight: 40,
    color: '#000000',
  },
  addressUser: {
    width: 133,
    height: 15, //80,
    marginTop: 20,
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    fontWeight: '900',
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 13,
    letterSpacing: 0.64,
    lineHeight: 15,
    color: '#000000',
    textTransform: 'uppercase',
  },

  buttonFollow: {
    width: '100%',
    height: 52,
    marginTop: 25,
    backgroundColor: '#000000',
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  textButtonFollow: {
    fontWeight: '900',
    fontFamily: 'RobotoCondensed-Bold',
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0.64,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  buttonMessage: {
    width: '100%',
    height: 52,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#000000',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  textButtonMessage: {
    fontWeight: '900',
    fontFamily: 'RobotoCondensed-Bold',
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0.64,
    textTransform: 'uppercase',
    color: '#000000',
  },
  detailProfile: {
    width: '90%',
    height: '54%', //48 con los botones de follow y message
    //backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imagePost: {
    width: 167,
    height: 220,
    marginTop: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  textNotPosts: {
    color: '#000000',
    marginTop: '40%',
    fontSize: 25,
  },
  //Modal
  containerModal: {
    flex: 1,
    backgroundColor: '#2a3638',
    padding: 20,
  },
  textModal: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#ffffff',
    fontFamily: 'Comfortaa-Bold',
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  buttonLogout: {
    width: '100%',
    height: 40,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    //backgroundColor: 'red',
    /* borderColor: 'yellow',
    borderStyle: 'solid',
    borderBottomWidth: 2, */
  },
  logout: {
    fontSize: 25,
    //color: '#000000',
    color: '#ffffff',
  },
  textLogout: {
    fontSize: 18,
    marginLeft: 5,
    color: '#ffffff',
  },
  buttonEditProfile: {
    width: '100%',
    height: 40,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  editProfile: {
    fontSize: 25,
    color: '#ffffff',
  },
  textEditProfile: {
    fontSize: 18,
    marginLeft: 5,
    color: '#ffffff',
  },
});

export default Profile;
