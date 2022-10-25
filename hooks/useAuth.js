import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  //const [isUserRegister, setIsUserRegister] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  function createAccountWithEmailAndPassword(email, password, username) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(additionalUserInfo => {
        const nameUser = username;
        //navigation.navigate('loggedOut');
        //setUserData(additionalUserInfo.user.uid);
        console.log('UID here', additionalUserInfo.user.uid);
        //if (isUserRegister === false) {
        //}
        //console.log(userData);
        const userUID = additionalUserInfo.user.uid;
        firestore()
          .collection('users')
          .doc(userUID)
          .set({
            id: userUID,
            name: nameUser,
            email: email,
            password: password,
            photoURL: null,
          })
          .then(() => {
            console.log('User added!');
            //navigation.navigate('loggedOut');
          });
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (err.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(err);
      });
  }

  function signInWithEmailPassword(emailUser, passwordUser) {
    auth()
      .signInWithEmailAndPassword(emailUser, passwordUser)
      .then(() => {
        console.log('Success');
        navigation.navigate('home');
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  const memoValue = useMemo(
    () => ({
      user,
      signInWithEmailPassword,
      createAccountWithEmailAndPassword,
      //isUserRegister,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
