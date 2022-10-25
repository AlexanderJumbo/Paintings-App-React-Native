import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, ListItem} from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../hooks/useAuth';
import LinearGradient from 'react-native-linear-gradient';

const ChatList = ({navigation /*, route, message*/ /* id */}) => {
  //console.log('message from chatlist ', message);
  //console.log('id from chatlist ', id);
  //const [dataMessage, setDataMessage] = useState([{}]);
  const [dataChats, setDataChats] = useState([{}]);
  const [dataChatsSender, setDataChatsSender] = useState([{}]);
  const [dataChatsReceive, setDataChatsReceive] = useState([{}]);
  //const [userInfo, setUserInfo] = useState({});
  const {user} = useAuth();

  useEffect(() => {
    const consultar = () => {
      firestore()
        .collection('chatsInfo')
        .where('idUserSender', '==', user.uid)
        //.limit(1)
        .onSnapshot(querySnapshot => {
          console.log(
            'hey chatINFO',
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
          setDataChats(
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });
    };
    consultar();
  }, [user.uid]);

  return (
    <View style={styles.container}>
      {dataChats.length > 0 ? (
        dataChats.map(datos => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('message', {
                idUserChat:
                  datos.idUserSender === user.uid
                    ? datos.idUserReceive
                    : datos.idUserSender,
                nameUserChat:
                  datos.idUserSender === user.uid
                    ? datos.nameUserReceive
                    : datos.nameUserSender,
              })
            }>
            <ListItem
              style={styles.rowChats} //photoProfileUserReceive photoProfileUserSender
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
              linearGradientProps={{
                colors: ['#2a3638', '#232828'],
                start: {x: 1, y: 0},
                end: {x: 0.2, y: 0},
              }}
              ViewComponent={LinearGradient} // Only if no expo
            >
              <Avatar
                rounded
                source={{
                  uri: datos.photoProfileUserReceive,
                }}
              />
              <ListItem.Content>
                <ListItem.Title style={{color: 'white', fontWeight: 'bold'}}>
                  {datos.idUserSender === user.uid
                    ? datos.nameUserReceive
                    : datos.nameUserSender}
                </ListItem.Title>
                <ListItem.Subtitle style={{color: 'white'}}>
                  {datos.idUserSender !== user.uid
                    ? datos.nameUserSender
                    : datos.nameUserReceive}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="white" />
            </ListItem>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.textEmptyChatList}>No hay chats aún 😅 ✘..</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 60,
  },
  rowChats: {
    marginBottom: 1,
  },
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
  textEmptyChatList: {
    color: '#000000',
    top: '45%',
    fontSize: 25,
    alignSelf: 'center',
    fontFamily: 'RobotoCondensed-Bold',
    fontWeight: '900',
    fontStyle: 'normal',
    lineHeight: 30,
    letterSpacing: 0.5,
    //textTransform: 'uppercase',
  },
});

export default ChatList;
