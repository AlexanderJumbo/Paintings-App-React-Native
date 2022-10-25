import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import useAuth from '../hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const notUserPhotoProfile = require('../assets/images/notUserPhotoProfile.jpg');

const EditProfile = () => {
  //const [buttonEnabled, setButtonEnabled] = useState(false);
  const {user} = useAuth();
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [city, setCity] = useState('');
  const [website, setWebsite] = useState('');
  const [bio, setBio] = useState('');

  const [image, setImage] = useState('');
  const [uploading, setupLoading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const buttonDisabled =
    !name || !username || !city || !website || !bio || image === null;

  useEffect(() => {
    const consultarUser = () => {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          console.log(
            '🚀 ~ file: EditProfile.js ~ line 31 ~ consultarUser ~ documentSnapshot',
            documentSnapshot.data(),
          );
          //console.log('hey document', documentSnapshot.data());
          setName(documentSnapshot.data().name);
          setImage(documentSnapshot.data().photoURL);
        });
    };

    consultarUser();
  }, []);

  const openPicker = () => {
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

  ///////////////////////////////////////////
  const updatedProfilePicture = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').slice(0, -1).join('.');
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setupLoading(true);
    setTransferred(0);
    const task = storage()
      .ref(`user_profile_pictures/${user.uid}/${filename}`)
      .putFile(uploadUri);

    task.on('state_changed', async taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
      const urlDownload = await storage()
        .ref(`user_profile_pictures/${user.uid}/${filename}`)
        .getDownloadURL();
      console.log(
        '🚀 ~ file: ModalScreen.js ~ line 78 ~ uploadImageWithStorage ~ urlDownload',
        urlDownload,
      );
      updatedUser(urlDownload);
    });
    //setCommentPost('');
    setImage(image);
    setUserName('');
    setCity('');
    setWebsite('');
    setBio('');
    try {
      await task;
      setupLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  ///////////////////////////////////////////

  const updatedUser = urlPhotoProfile => {
    firestore().collection('users').doc(user.uid).update({
      photoURL: urlPhotoProfile,
      username,
      city,
      website,
      bio,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <Image
            source={image ? {uri: image} : notUserPhotoProfile}
            style={styles.profilePhoto}
          />
          <TouchableOpacity
            style={styles.profilePhotoButton}
            onPress={openPicker}>
            <Text style={styles.profileButtonPhotoText}>
              Change profile photo
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.containerForms}>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <TextInput
              style={styles.inputs}
              placeholder="Name"
              keyboardType="ascii-capable"
              maxLength={10}
              placeholderTextColor="#000000"
              value={name}
              onChangeText={setName}
              editable={false}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Username"
              keyboardType="ascii-capable"
              maxLength={10}
              placeholderTextColor="#000000"
              value={username}
              onChangeText={setUserName}
            />
            <TextInput
              style={styles.inputs}
              placeholder="City"
              keyboardType="ascii-capable"
              maxLength={10}
              placeholderTextColor="#000000"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Website"
              keyboardType="web-search"
              maxLength={10}
              placeholderTextColor="#000000"
              value={website}
              onChangeText={setWebsite}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Bio"
              keyboardType="ascii-capable"
              maxLength={50}
              multiline={true}
              numberOfLines={3}
              placeholderTextColor="#000000"
              value={bio}
              onChangeText={setBio}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={
            buttonDisabled ? styles.buttonUpdateDisabled : styles.buttonUpdate
          }
          disabled={buttonDisabled}
          onPress={updatedProfilePicture}>
          <Text style={styles.textButtonUpdate}>Update Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '100%',
    height: '95%',
    alignSelf: 'center',
    //backgroundColor: 'red',
  },
  containerHeader: {
    width: '95%',
    height: '30%',
    marginTop: 15,
    alignSelf: 'center',
    //backgroundColor: 'yellow',
  },
  profilePhoto: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 5,
    resizeMode: 'stretch',
  },
  profilePhotoButton: {
    width: 170,
    height: 50,
    marginTop: 10,
    backgroundColor: '#000000',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  profileButtonPhotoText: {
    fontFamily: 'Comfortaa-Regular',
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 1,
    lineHeight: 15,
    color: '#ffffff',
  },
  containerForms: {
    width: '95%',
    height: '60%',
    //backgroundColor: 'green',
    alignSelf: 'center',
    marginTop: 10,
  },
  inputs: {
    marginTop: 20,
    paddingLeft: 13,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    color: '#000000',
  },
  buttonUpdate: {
    width: 170,
    height: 50,
    marginTop: 30,
    backgroundColor: '#000000',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonUpdateDisabled: {
    width: 170,
    height: 50,
    marginTop: 30,
    backgroundColor: 'gray',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  textButtonUpdate: {
    fontFamily: 'Comfortaa-Regular',
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 1,
    lineHeight: 15,
    color: '#ffffff',
  },
});

export default EditProfile;
