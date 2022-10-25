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
import BackIcon from 'react-native-vector-icons/AntDesign';

const notUserPhotoProfile = require('../assets/images/notUserPhotoProfile.jpg');

const ProfileOtherUser = ({navigation, route}) => {
  id = route.params.userPostId;
  console.log(
    '🚀 ~ file: ProfileOtherUser.js ~ line 19 ~ ProfileOtherUser ~ id',
    id,
  );
  nameUser = route.params.name;
  console.log(
    '🚀 ~ file: ProfileOtherUser.js ~ line 21 ~ ProfileOtherUser ~ nameUser',
    nameUser,
  );

  const {user} = useAuth();
  const [dataUser, setDataUser] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [userFollowed, setUserFollowed] = useState({});

  useEffect(() => {
    const consultarPosts = () => {
      firestore()
        .collection('posts')
        .where('userPostId', '==', id)
        .get()
        .then(querySnapshot => {
          setDataUser(querySnapshot.docs);
        });
    };

    consultarPosts();

    const consultarUser = () => {
      firestore()
        .collection('users')
        .doc(id)
        /* .get()
      .then */ .onSnapshot(documentSnapshot => {
          console.log('hey document', documentSnapshot.data());
          setUserInfo(documentSnapshot.data());
        });
    };
    consultarUser();

    const consultarFollowingList = () => {
      firestore()
        .collection('users')
        .doc(user.uid)
        .collection('following')
        .doc(id)
        .onSnapshot(documentSnapshot => {
          //console.log('following List', documentSnapshot.data());
          setUserFollowed(documentSnapshot.data());
        });
    };
    consultarFollowingList();
  }, []);
  const messageScreen = () => {
    navigation.navigate('messageGeneric', {
      id: id,
      name: nameUser,
    });
  };

  const followPerson = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('following')
      .doc(id)
      .set({
        nameUser: nameUser,
        idUser: id,
      })
      .then(console.log('following now'));
  };
  const unFollowPerson = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('following')
      .doc(id)
      .delete()
      .then(console.log('User has been eliminated of your list following...'));
  };

  console.log(
    '🚀 ~ file: ProfileOtherUser.js ~ line 91 ~ ProfileOtherUser ~ userFollowed',
    userFollowed,
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerProfile}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}>
          <BackIcon name="back" style={styles.back} />
        </TouchableOpacity>
        <Image
          source={
            userInfo.photoURL ? {uri: userInfo.photoURL} : notUserPhotoProfile
          }
          style={styles.photoProfile}
        />
        <Text style={styles.nameUser}>{nameUser}</Text>
        <Text style={styles.addressUser}>{userInfo.city}</Text>
        {userFollowed?.idUser ? (
          <TouchableOpacity
            style={styles.buttonFollow}
            onPress={unFollowPerson}>
            <Text style={styles.textButtonFollow}>
              Unfollow {/* {nameUser} */}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonFollow} onPress={followPerson}>
            <Text style={styles.textButtonFollow}>
              Follow {/* {nameUser} */}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.buttonMessage} onPress={messageScreen}>
          <Text style={styles.textButtonMessage}>
            Message {/* {nameUser} */}
          </Text>
        </TouchableOpacity>
      </View>
      {/* {dataUser.map(image => { */}
      <View style={styles.containerDetail}>
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
      </View>
    </View>
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
    height: '65%',
    //backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonBack: {
    width: 30,
    height: 30,
    alignSelf: 'flex-start',
  },
  back: {
    fontSize: 25,
    color: '#000000',
  },
  photoProfile: {
    width: 128,
    height: 128,
    alignSelf: 'center',
    borderRadius: 64,
    marginTop: 20,
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
  containerDetail: {
    marginTop: 10,
    height: 200,
  },
  detailProfile: {
    width: '90%',
    //height: '48%',
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
});

export default ProfileOtherUser;
