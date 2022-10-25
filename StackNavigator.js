import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoggedOut from './Screens/LoggedOut';
import Register from './Screens/Register';
import RegisterNextStep from './Screens/RegisterNextStep';
import Login from './Screens/Login';
import Home from './Screens/Home';
import ContentPost from './Screens/ContentPost';
import useAuth from './hooks/useAuth';
import Profile from './Screens/Profile';
import Chat from './Screens/Chat';
import Search from './Screens/Search';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Message from './Screens/Message';
import ChatList from './Components/ChatList';
import MessageGeneric from './Screens/MessageGeneric';
import ProfileOtherUser from './Screens/ProfileOtherUser';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EditProfile from './Screens/EditProfile';
import Settings from './Screens/Settings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ChatStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

////////////////////////////////////
const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -2,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}>
    <View
      style={{
        width: 100,
        height: 50,
        borderRadius: 35,
        backgroundColor: '#e32f45',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

////////////////////////////////////

const StatckNavigator = () => {
  const {user /* isUserRegister */} = useAuth();
  console.log(
    '🚀 ~ file: StatckNavigator.js ~ line 15 ~ StatckNavigator ~ user',
    user,
  );

  const HomeScreen = () => {
    return (
      <HomeStack.Navigator>
        <Tab.Screen
          name="Feed"
          component={Home}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="profileOtherUser"
          component={ProfileOtherUser}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="messageGeneric"
          component={MessageGeneric}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
    );
  };

  const ChatScreen = () => {
    return (
      <ChatStack.Navigator>
        <Tab.Screen
          name="Chats"
          component={Chat}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitleAlign: 'center',
            title: 'Chats',
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: 'Comfortaa-Bold',
              color: '#000000',
              lineHeight: 22,
              fontWeight: '600',
            },
          }}
        />
        <Tab.Screen
          name="message" ///
          component={Message}
          options={{headerShown: false}}
        />
      </ChatStack.Navigator>
    );
  };

  const ProfileScreen = () => {
    return (
      <ProfileStack.Navigator>
        <Tab.Screen
          name="profileFeed"
          component={Profile}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="editProfile"
          component={EditProfile}
          options={{
            title: 'Edit profile',
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: 'Comfortaa-Bold',
              color: '#000000',
              lineHeight: 22,
              fontWeight: '600',
            },
          }}
        />
        <Tab.Screen
          name="settings"
          component={Settings}
          options={{
            title: 'Settings',
            headerTitleAlign: 'center',
            headerTransparent: true,
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: 'Comfortaa-Bold',
              color: '#000000',
              lineHeight: 22,
              fontWeight: '600',
            },
          }}
        />
      </ProfileStack.Navigator>
    );
  };

  return (
    /* Aquí comienza el tab navigator */
    <>
      {user ? (
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 2,
              //left: 20,
              //right: 40,
              elevation: 0,
              backgroundColor: '#ffffff',
              //borderRadius: 15,
              height: 65,
              ...styles.shadow,
            },
          }}>
          <Tab.Screen
            initialRouteName="Home"
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarHideOnKeyboard: true,

              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center' /* top: 10 */,
                  }}>
                  <Image
                    source={require('./assets/images/home.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? '#e32f45' : '#748c94',
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? '#e32f45' : '#748c94',
                      fontSize: 12,
                    }}>
                    HOME
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="search"
            component={Search}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center' /* top: 10 */,
                  }}>
                  <Image
                    source={require('./assets/images/search.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? '#e32f45' : '#748c94',
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? '#e32f45' : '#748c94',
                      fontSize: 12,
                    }}>
                    SEARCH
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="contentPost"
            component={ContentPost}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <Image
                  source={require('./assets/images/post.png')}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 50,
                    tintColor: '#fff',
                  }}
                />
              ),
              tabBarButton: props => <CustomTabBarButton {...props} />,
            }}
          />
          <Tab.Screen
            name="chat"
            component={ChatScreen}
            options={{
              headerShown: false,
              tabBarHideOnKeyboard: true,
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center' /* top: 10 */,
                  }}>
                  <Image
                    source={require('./assets/images/chat.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? '#e32f45' : '#748c94',
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? '#e32f45' : '#748c94',
                      fontSize: 12,
                    }}>
                    CHATS
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
              tabBarHideOnKeyboard: true,
              tabBarIcon: ({focused}) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center' /* top: 10 */,
                  }}>
                  {/* <Image
                    source={require('./assets/images/settings.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? '#e32f45' : '#748c94',
                    }}
                  /> */}
                  <Ionicons
                    name="ios-person-sharp"
                    size={25}
                    color={focused ? '#e32f45' : '#748c94'}
                  />
                  <Text
                    style={{
                      color: focused ? '#e32f45' : '#748c94',
                      fontSize: 12,
                    }}>
                    PROFILE
                  </Text>
                </View>
              ),
            }}
          />
          {/* <Tab.Screen
            name="message" ///
            component={Message}
            options={{headerShown: false}}
          /> */}
          {/* <Tab.Screen
            name="messageGeneric"
            component={MessageGeneric}
            options={{headerShown: false}}
          /> */}
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name="loggedOut"
              component={LoggedOut}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="registerNextStep"
              component={RegisterNextStep}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default StatckNavigator;
