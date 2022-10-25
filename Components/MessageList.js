import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const MessageList = ({message, imageUser}) => {
  console.log('FlatList', message, imageUser);
  return (
    <View style={styles.container}>
      <Text style={styles.messages}>{message}</Text>
      <Image style={styles.image} source={{uri: imageUser}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    //backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row-reverse',
    flex: 1,
  },
  messages: {
    /* width: '100%',
    height: '100%', //600,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap', */
    width: '80%',
    height: 60,
    display: 'flex',
    flexDirection: 'row-reverse',
    marginLeft: 10,
    marginVertical: 8,
    color: '#000000',
    backgroundColor: 'rgba(0,0,0,0.03)',
    textAlign: 'justify',
    borderRadius:9,
    padding:5
    //marginHorizontal: 5,
    //backgroundColor: 'blue',
  },
  image: {
    marginTop: 40,
    //marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 10,
    resizeMode: 'stretch',
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default MessageList;
