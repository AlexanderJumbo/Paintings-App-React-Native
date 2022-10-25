import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PostIcon from 'react-native-vector-icons/Entypo';
import MenuIcon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../hooks/useAuth';
import uuid from 'react-native-uuid';

const imageDefault = require('../assets/images/placeholder.png');

const ContentPost = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [commentPost, setCommentPost] = useState('');
  const [uploading, setupLoading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const {user} = useAuth();
  const [dataUser, setDataUser] = useState([]);
  //console.log('🚀 ~ file: ContentPost.js ~ line 24 ~ ContentPost ~ user', user);

  const incompleteFields = !image || !commentPost;

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        console.log('hey', documentSnapshot.data());
        setDataUser(documentSnapshot.data());
      });
    //.where('id', '==', user.uid)
    //.get()
    /*.then(querySnapshot => {
        setDataUser(querySnapshot.docs);
      });*/
  }, []);

  //console.log('dataUser from contenPost ', dataUser.email);

  const openPiker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        //setImage(image);
      })
      .catch(error => {
        console.error(error);
      });
  };
  console.log(image);
  const uploadImageWithStorage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').slice(0, -1).join('.');
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setupLoading(true);
    setTransferred(0);
    const task = storage().ref(filename).putFile(uploadUri);
    /*console.log(
      '🚀 ~ file: ModalScreen.js ~ line 81 ~ uploadImageWithStorage ~ uploadUri',
      uploadUri,
    );
    console.log(
      '🚀 ~ file: ModalScreen.js ~ line 81 ~ uploadImageWithStorage ~ filename',
      filename,
    );*/

    task.on('state_changed', async taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
      const urlDownload = await storage().ref(filename).getDownloadURL();
      console.log(
        '🚀 ~ file: ModalScreen.js ~ line 78 ~ uploadImageWithStorage ~ urlDownload',
        urlDownload,
      );
      savedPost(user.uid, urlDownload, name);
    });
    setCommentPost('');
    setImage(null);
    try {
      await task;
      setupLoading(false);
      /*Alert.alert('Upload Post', 'You post has been upload successfully', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('home'),
        },
      ]);*/
    } catch (error) {
      console.log(error);
    }
    //setImage(null);
    //setIsSelectImage(false);
  };

  function savedPost(idUserPost, urlPost, name) {
    firestore()
      .collection('posts')
      .doc(name)
      .set({
        id: uuid.v4(),
        userPostId: idUserPost,
        commentPost: commentPost,
        photoPostURL: urlPost,
        emailUser: dataUser.email,
        nameUser: dataUser.name,
        photoUserURL: dataUser.photoURL,
      })
      .then(() => {
        console.log('You post has been upload successfully!');
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerBar}>
        <Text style={styles.title}>Post your magic</Text>
        {uploading ? (
          <View style={styles.waitUploadImage}>
            <Text style={styles.textWaitUploadImage}>
              {transferred} % Completed!
            </Text>
            <ActivityIndicator size="large" color="#E58947" />
          </View>
        ) : (
          <TouchableOpacity
            onPress={uploadImageWithStorage}
            disabled={incompleteFields}>
            <PostIcon
              name="publish"
              style={
                incompleteFields ? styles.postIconDisabled : styles.postIcon
              }
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.subTitle}>How do you feel today</Text>
      <TextInput
        value={commentPost}
        onChangeText={setCommentPost}
        placeholder="What are you thinking about...?"
        placeholderTextColor="#000000"
        maxLength={150}
        style={styles.input}
        multiline={true}
        numberOfLines={4}
      />
      <Image
        style={styles.imagePost}
        source={
          image
            ? {
                uri: image,
              }
            : imageDefault
        }
      />
      {/* <TouchableOpacity onPress={attachment}>
        <AttachmentIcon name="attachment" style={styles.attachmentIcon} />
      </TouchableOpacity> */}

      <View style={styles.containerMenuButton}>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          style={styles.actionButtonMain}>
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Choose a Photo"
            onPress={openPiker}>
            <MenuIcon name="md-images" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Open Camera"
            onPress={openCamera}>
            <MenuIcon name="camera-reverse" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
    height: '40%',
    display: 'flex',
    flexDirection: 'column',
    //backgroundColor: 'blue',
  },
  containerBar: {
    width: '90%',
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: 'red',
    alignSelf: 'center',
  },
  title: {
    marginTop: 30,
    //marginLeft: 10,
    fontFamily: 'Comfortaa-Regular',
    fontSize: 30,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: -0.24,
    lineHeight: 40,
  },

  waitUploadImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWaitUploadImage: {
    margin: 20,
    fontSize: 13,
    color: '#000000',
  },

  postIcon: {
    marginTop: 35,
    fontSize: 30,
    right: 20,
    color: '#000000',
  },
  postIconDisabled: {
    marginTop: 35,
    fontSize: 30,
    right: 20,
    color: '#C3C7D9',
  },
  subTitle: {
    marginTop: 10,
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
  input: {
    width: '90%',
    height: 60,
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    textAlignVertical: 'top',
    alignSelf: 'center',
    color: '#000000',
    fontFamily: 'RobotoCondensed-LightItalic',
    fontSize: 15,
    fontWeight: '400',
  },
  /*menuIcon: {
    marginTop: 35,
    fontSize: 30,
    color: '#000000',
    alignSelf: 'center',
  },*/
  imagePost: {
    width: '90%',
    height: 343,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 12,
  },
  containerMenuButton: {
    width: '90%',
    height: '25%',
    marginTop: 20,
    alignSelf: 'center',
    //backgroundColor: 'yellow',
  },
  actionButtonMain: {
    //right: '35%',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default ContentPost;
