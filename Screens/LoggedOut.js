import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';

const image = require('../assets/images/background3.jpg');

const LoggedOut = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#CBCECC" //"#929CA7" //"#929CA7" //"#FA5B5B"
        barStyle="dark-content"
        showHideTransition="slide"
        hidden={false}
      />
      <Image style={styles.image} source={image} />
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('login')}>
          <Text style={styles.textLoginButton}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('register')}
          style={styles.registerButton}>
          <Text style={styles.textRegisterButton}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    /*display: 'flex',
    flexDirection: 'column',*/
  },
  image: {
    width: '100%',
    height: '85%',
  },
  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loginButton: {
    width: 187,
    height: 52,
    left: 16,
    marginTop: 20,
    borderRadius: 6,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
  },
  textLoginButton: {
    width: '100%',
    color: '#000000',
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 0.64,
    lineHeight: 15,
    fontWeight: '900',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  registerButton: {
    width: 187,
    height: 52,
    right: 16,
    marginTop: 20,
    marginLeft: 45,
    borderRadius: 6,
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#000000',
  },
  textRegisterButton: {
    width: '100%',
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 0.64,
    lineHeight: 15,
    fontWeight: '900',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
});

export default LoggedOut;
