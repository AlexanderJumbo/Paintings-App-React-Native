import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from '@rneui/base';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../hooks/useAuth';
import SendIcon from 'react-native-vector-icons/Ionicons';
import BackIcon from 'react-native-vector-icons/Ionicons';
import MessageList from '../Components/MessageList';

const Message = ({navigation, route}) => {
  id = route.params.idUserChat;
  console.log('🚀 ~ file: Message.js ~ line 18 ~ Message ~ id', id);
  nameUserChat = route.params.nameUserChat;
  console.log(
    '🚀 ~ file: Message.js ~ line 19 ~ Message ~ nameUserChat',
    nameUserChat,
  );
  //console.log('id from message screem', id);
  //console.log('name from message screem', name);
  const [message, setMessage] = useState('');
  const [messageSender, setMessageSender] = useState([]);
  const [messageReciver, setMessageReceiver] = useState([]);
  //const [messageData, setMessageData] = useState([]);
  const [userData, setUserData] = useState({});
  const [otherUserData, setOtherUserData] = useState({});
  const [messagesList, setMessagesList] = useState([]);
  const {user} = useAuth();
  const users = [user.uid, id];
  const arrayMessages = [];
  useEffect(() => {
    //////////////
    const consultarMessages = () => {
      firestore()
        .collection('messages')
        .doc(user.uid + id)
        .collection('textMessages')
        .orderBy('createdAt', 'desc')
        //.where('message', '!=', '')
        //.get()
        //.then(
        .onSnapshot(querySnapshot => {
          setMessagesList(
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
          console.log(
            'messages FFFFFFF',
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });
    };

    consultarMessages();
    //////////////////

    const consultarUser = () => {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          console.log('hey user message screen', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        });
    };

    consultarUser();

    const consultarOtherUser = () => {
      firestore()
        .collection('users')
        .doc(id)
        .get()
        .then(documentSnapshot => {
          console.log('hey other user message screen', documentSnapshot.data());
          setOtherUserData(documentSnapshot.data());
        });
    };

    consultarOtherUser();
  }, [user.uid, id]);

  //console.log('message data', messageData);
  console.log('user data', userData);

  const sendMessage = () => {
    firestore()
      .collection('messages')
      .doc(user.uid + id) //
      .collection('textMessages') //
      .add({
        idUserSender: user.uid,
        photoProfileUserSender: userData.photoURL,
        nameUserSender: userData.name,
        idUserReceive: id,
        photoProfileUserReceive: otherUserData.photoURL,
        nameUserReceive: nameUserChat,
        message: message,
        idMessage: user.uid + id,
        createdAt: firestore.FieldValue.serverTimestamp(),
        //ids: users,
      })
      .then(() => {
        console.log('You message has been sent');
        setMessage('');
      });

    firestore()
      .collection('messages')
      .doc(id + user.uid) //
      .collection('textMessages') //
      .add({
        idUserSender: user.uid,
        photoProfileUserSender: userData.photoURL,
        nameUserSender: userData.name,
        idUserReceive: id,
        photoProfileUserReceive: otherUserData.photoURL,
        nameUserReceive: nameUserChat,
        message: message,
        idMessage: user.uid + id,
        createdAt: firestore.FieldValue.serverTimestamp(),
        //ids: users,
      })
      .then(() => {
        console.log('You message has been sent');
        setMessage('');
      });
    ///////

    firestore()
      .collection('chatsInfo')
      .doc(user.uid + id)
      .set({
        idUserSender: user.uid,
        photoProfileUserSender: userData.photoURL,
        idUserReceive: id,
        photoProfileUserReceive: otherUserData.photoURL,
        nameUserReceive: nameUserChat,
      })
      .then(() => {
        console.log('You message has been');
      });
    /* firestore()
      .collection('chatsInfo')
      .doc(id + user.uid)
      .set({
        idUserSender: user.uid,
        photoProfileUserSender: userData.photoURL,
        idUserReceive: id,
        photoProfileUserReceive: otherUserData.photoURL,
        nameUserReceive: nameUserChat,
      })
      .then(() => {
        console.log('You message has been');
      }); */
  };
  const renderItem = ({item}) => (
    <MessageList
      message={item.message}
      imageUser={item.photoProfileUserSender}
    />
  );

  const isDisabledButton = !message;

  return (
    <View style={styles.conatiner}>
      {/* <ScrollView> */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonBack}>
          <BackIcon name="arrow-back" style={styles.backIcon} />
        </TouchableOpacity>
        <Image
          style={styles.photoProfileHeader}
          source={{uri: otherUserData.photoURL}}
        />
        <Text style={styles.userTitle}>{nameUserChat}</Text>
      </View>
      {/* <View style={styles.messages}>
          {messagesList.map(sms => (
            <View style={styles.messagesRow}>
              <Text style={styles.messagesSender}>{sms.message}</Text>
              <Image
                style={styles.imageUser}
                source={{uri: sms.photoProfileUserSender}}
              />
            </View>
          ))}
        </View> */}
      {/* </ScrollView> */}
      <View style={styles.listMessages}>
        <FlatList
          inverted={-1}
          scrollEnabled={true}
          data={messagesList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      {/* <KeyboardAvoidingView style={{flex: -1}}> */}
      <View style={styles.subContainer}>
        <TextInput
          placeholder="Type something..."
          placeholderTextColor="#000"
          value={message}
          onChangeText={setMessage}
          style={styles.inputMessage}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={
            isDisabledButton ? styles.buttonSendDisabled : styles.buttonSend
          }
          disabled={isDisabledButton}>
          <SendIcon
            style={styles.buttonSendIcon}
            name={isDisabledButton ? 'md-warning' : 'ios-send-sharp'}
          />
        </TouchableOpacity>
        {/* <Button
          style={styles.buttonSend}
          title="Enviar"
          onPress={sendMessage}
        /> */}
      </View>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
    height: '85%',
    //backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  buttonBack: {
    width: 30,
    //backgroundColor: 'red',
  },
  backIcon: {
    width: '90%',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
    color: '#000',
    //backgroundColor: 'yellow',
  },
  photoProfileHeader: {
    marginTop: 15,
    width: 40,
    height: 40,
    //left: 95,
    borderRadius: 30,
    //alignSelf: 'center',
  },
  userTitle: {
    width: '50%',
    color: '#000',
    fontSize: 20,
    textAlign: 'left',
    //marginTop: 20,
    left: 5,
    //marginLeft: 90,
  },
  listMessages: {
    width: '100%',
    height: '80%', //600,
    //backgroundColor: 'yellow',
  },
  subContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    //backgroundColor: 'yellow',
  },
  inputMessage: {
    width: '85%',
    height: 40,
    marginLeft: 5,
    marginTop: 5,
    color: '#000000',
    //backgroundColor: 'rgba(0,0,0,0.03)',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,1)',
    borderRadius: 10,
  },
  buttonSend: {
    width: 50,
    height: 40,
    marginTop: 5,
    marginLeft: 5,
    //backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,1)',
  },
  buttonSendDisabled: {
    width: 50,
    height: 40,
    marginTop: 5,
    marginLeft: 5,
    //backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  buttonSendIcon: {
    //top: 50,
    //marginTop: 8,
    color: '#ffffff',
    fontSize: 25,
    alignSelf: 'center',
  },
});

export default Message;
