import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import BackIcon from 'react-native-vector-icons/AntDesign';
import useAuth from '../hooks/useAuth';

const Login = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const incompleteInputs = !userEmail || !userPassword;

  const {signInWithEmailPassword} = useAuth();

  function signIn() {
    signInWithEmailPassword(userEmail, userPassword);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('loggedOut')}>
        <BackIcon name="back" style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.containerContent}>
        <Text style={styles.title}>Log in</Text>
        <TextInput
          value={userEmail}
          onChangeText={setUserEmail}
          style={styles.input}
          placeholder="Enter you email..."
          placeholderTextColor="#000000"
          autoFocus={true}
          autoComplete="email"
          keyboardType="email-address"
        />
        <TextInput
          value={userPassword}
          onChangeText={setUserPassword}
          style={styles.input}
          placeholder="Enter your password ..."
          placeholderTextColor="#000000"
          secureTextEntry={true}
          autoComplete="password"
          keyboardType="ascii-capable"
        />
        <TouchableOpacity
          style={incompleteInputs ? styles.buttonDisabled : styles.button}
          disabled={incompleteInputs}
          onPress={signIn}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    //backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
  },
  backIcon: {
    //width: 20,
    fontSize: 20,
    height: 20,
    top: 20,
    left: 20,
    color: '#000000',
  },
  containerContent: {
    //backgroundColor: 'red',
    width: '100%',
    height: '50%',
    marginTop: 40,
  },
  title: {
    color: '#000000',
    fontSize: 36,
    fontFamily: 'Comfortaa-Regular',
    fontWeight: '400',
    lineHeight: 40,
    letterSpacing: -0.24,
    left: 20,
    top: 15,
  },
  input: {
    width: '90%',
    height: 52,
    left: 20,
    top: 60,
    marginBottom: 20,
    padding: 15,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 15,
    color: '#000',
    lineHeight: 18,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#000000',
    alignSelf: 'flex-start',
  },
  button: {
    width: '90%',
    height: 52,
    left: 20,
    marginTop: 60,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 6,
    justifyContent: 'center',
  },
  buttonDisabled: {
    width: '90%',
    height: 52,
    left: 20,
    marginTop: 60,
    backgroundColor: '#565454',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 6,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontWeight: '900',
    //fontStyle: 'italic',
    color: '#FFFFFF',
    alignSelf: 'center',
    letterSpacing: 0.64,
  },
});

export default Login;
