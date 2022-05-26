import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Login from '../../pages/login';
import Register from '../../pages/register';
import {navigationRef} from './rootNavigation';
import Chat from '../../pages/chat';
import DashboardUser from '../../pages/dashboardUser';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Profile: {userId: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
  Register: undefined;
  DashboarUser: undefined;
  Chat: undefined;
  AllUser: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login', 'Home'>;

function LoginScreen({route, navigation}: Props) {
  return <Login />;
}

function RegisterScreen({route, navigation}: Props) {
  return <Register />;
}

function ChatScreen({route, navigation}: Props) {
  return <Chat />;
}

function DashboarUserScreen({route, navigation}: Props) {
  return <DashboardUser />;
}
function AllUserScreen() {
  return <DashboardUser />;
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator initialRouteName="Register">
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Chat"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="DashboarUser"
          component={DashboarUserScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="AllUser"
          component={AllUserScreen}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
