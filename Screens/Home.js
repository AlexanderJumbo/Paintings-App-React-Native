import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useAuth from '../hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import PostsList from '../Components/PostsList';

const notUserPhotoProfile = require('../assets/images/notUserPhotoProfile.jpg');

const Home = ({navigation}) => {
  const {user} = useAuth();
  const [dataUser, setDataUser] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const consultarPosts = () => {
      firestore()
        .collection('posts')
        .where('userPostId', '!=', user.uid)
        .onSnapshot(querySnapshot => {
          setDataUser(querySnapshot.docs);
        });
    };
    consultarPosts();
    const consultarUser = () => {
      firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
          console.log('hey document', documentSnapshot.data());
          setUserInfo(documentSnapshot.data());
        });
    };
    consultarUser();
  }, []);

  //console.log('🚀 ~ file: Home.js ~ line 35 ~ Home ~ dataUser', dataUser);

  const renderItem = ({item}) => (
    <PostsList
      imagePost={item._data.photoPostURL}
      pictureUserPost={item._data.photoUserURL}
      commentPost={item._data.commentPost}
      nameUser={item._data.nameUser}
      userPostId={item._data.userPostId}
      name={item._data.nameUser}
      //navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <Image
            source={
              userInfo.photoURL ? {uri: userInfo.photoURL} : notUserPhotoProfile
            }
            style={styles.profile}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Discover</Text>
      </View>
      <Text style={styles.subTitle}>What’s new today</Text>

      {dataUser.length > 0 ? (
        <SafeAreaView style={styles.content}>
          <FlatList
            data={dataUser}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            scrollEnabled={true}
          />
        </SafeAreaView>
      ) : (
        <Text style={styles.textEmptyListPosts}>Not posts yet ✘...</Text>
      )}
      <Text style={styles.title2}>Browse all</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '73%',
    display: 'flex',
    flexDirection: 'column',
  },
  subContainer: {
    width: '100%',
    height: '10%',
    //backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    //justifyContent: 'space-around',
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 22,
    marginLeft: 10,
  },
  title: {
    marginTop: 22, //22
    marginLeft: 20,
    fontFamily: 'Comfortaa-Regular',
    fontStyle: 'normal',
    fontSize: 36,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.24,
    lineHeight: 50, //40
    alignSelf: 'center',
  },
  /*newPostIcon: {
    marginTop: 10,
    fontSize: 30,
    color: '#000000',
  },*/
  subTitle: {
    marginTop: 30,
    marginLeft: 20,
    color: '#000000',
    fontFamily: 'RobotoCondensed-Bold',
    fontWeight: '900',
    fontSize: 13,
    fontStyle: 'normal',
    lineHeight: 15,
    letterSpacing: 0.64,
    textTransform: 'uppercase',
  },
  title2: {
    color: '#000000',
    marginTop: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  content: {
    //flex: 1,
    //backgroundColor: 'yellow',
    width: '95%',
    height: 'auto',
    marginTop: 10,
    alignSelf: 'center',
  },
  textEmptyListPosts: {
    color: '#000000',
    marginTop: '60%',
    fontSize: 25,
    fontFamily: 'RobotoCondensed-Bold',
    fontWeight: '900',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 1.25,
    //textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Home;
