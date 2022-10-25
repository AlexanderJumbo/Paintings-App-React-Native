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

const RegisterNextStep = ({navigation, route}) => {
  const email = route.params.email;
  const password = route.params.password;
  console.log(
    '🚀 ~ file: RegisterNextStep.js ~ line 13 ~ RegisterNextStep ~ password',
    password,
  );
  console.log(
    '🚀 ~ file: RegisterNextStep.js ~ line 14 ~ RegisterNextStep ~ email',
    email,
  );
  const [userName, setUserName] = useState('');
  const incompleteInputs = !userName;
  const {createAccountWithEmailAndPassword} = useAuth();

  const signUp = () => {
    createAccountWithEmailAndPassword(email, password, userName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackIcon name="back" style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.containerContent}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          value={userName}
          onChangeText={setUserName}
          style={styles.input}
          placeholder="Enter you userName..."
          placeholderTextColor="#000000"
          autoFocus={true}
          autoComplete="name"
          keyboardType="ascii-capable"
          maxLength={10}
        />
        <TouchableOpacity
          style={incompleteInputs ? styles.buttonDisabled : styles.button}
          disabled={incompleteInputs}
          onPress={signUp}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        <Text style={styles.conditionsText}>
          By signing up, you agree to Photo’s{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text style={{textDecorationLine: 'underline'}}> Privacy Policy</Text>
          .
        </Text>
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
  conditionsText: {
    margin: 20,
    marginTop: 30,
    fontSize: 16,
    fontFamily: 'RobotoCondensed-Regular',
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'left',
    color: '#000000',
  },
});
//RegisterNextStep.propTypes = propTypes;
export default RegisterNextStep;
