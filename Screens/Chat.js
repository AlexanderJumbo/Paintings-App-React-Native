import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, ListItem} from '@rneui/themed';
import ChatList from '../Components/ChatList';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../hooks/useAuth';

const Chat = ({navigation, route}) => {
  const {user} = useAuth();
  const [message, setMessage] = useState([]);
  //const idM = route.params.idU;
  //console.log('🚀 ~ file: Chat.js ~ line 12 ~ Chat ~ id', idM);

  //console.log('🚀 ~ file: Chat.js ~ line 7 ~ Chat ~ comment', id);
  /*const list = [
    {
      name: 'Amy Farha',
      avatar_url:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      subtitle: 'Vice President',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
  ];*/

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('chat')
      .doc(user.uid)
      //.where('id', '>', 0)
      .collection('messages')
      .doc('nDHNVajhXrPawiPKSAQdjPXCIwJ3')
      .collection('sms')
      .onSnapshot(querySnapshot => {
        console.log(
          'hey',
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
        setMessage(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      });
    /*
      .onSnapshot(querySnapshot => {
        console.log(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      });*/

    /*.get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        //console.log(querySnapshot.data());
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
        });
      });*/

    //////////////////////
    /*const subscriber = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('chat')
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });*/

    // Stop listening for updates when no longer required
    //return () => subscriber();
    ///////////////////////
    /* firestore()
      .collection('users')
      .doc(user.uid)
      .collection('chat')
      .onSnapshot(snapshot => {
        snapshot.forEach(snap => {
          console.log('snap', snap.data());
        });
        console.log('snapshot', snapshot_parts);
      }); */
    /* 
      .doc('vaoEOqhWu3fzvomwbbYlq8lyUyp2')
      .collection('receivedMessages')
      .doc('kNsDWllseAVIx0b3ueCi') */
    //.where('idUserReceive', '==', id)
    //.where('idUserSender', '==', user.uid)
    /*.get()
      .then(querySnapshot => {
        //setMessage(querySnapshot.docs);
        console.log('hey 1', querySnapshot);
      });*/

    /*firestore()
      .collection('chat')
      .where('idUserReceive', '==', user.uid)
      //.where('idUserSender', '==', id)
      .get()
      .then(querySnapshot => {
        //setMessageReceiver(querySnapshot.docs);
        //console.log('hey 2', querySnapshot.docs);
      });*/
  }, []);
  console.log('message hgere', message);
  return (
    <View>
      <ChatList message={message} navigation={navigation} /* id={idM} */ />
      {/* {list.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar source={{uri: l.avatar_url}} />
          <ListItem.Content>
            <ListItem.Title>{l.name}</ListItem.Title>
            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))} */}
    </View>
  );
};

export default Chat;
