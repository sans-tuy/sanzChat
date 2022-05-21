import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, VFC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as navigation from '../../config/router/rootNavigation';
import {firebase, FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {increment, saveUserData} from '../../config/redux/reducer';

type userDataTypes = {
  password?: string;
  userData: string[];
};

const Login = ({navigasi, navigasiRegis}: any) => {
  const [email, setemail] = useState<string>('');
  const [password, setpassword] = useState<string>('');
  const dispacth = useDispatch();
  const value = useSelector((state: any) => state.counter.value);
  const userData = useSelector((state: any) => state.counter.userData);

  const onLoginRDB = () => {
    try {
      firebase
        .app()
        .database(
          'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
        )
        .ref('users/')
        .orderByChild('email')
        .equalTo(email)
        .once('value')
        .then(async snapshot => {
          if (snapshot.val() == null) {
            Alert.alert('Invalid Email Id');
            return false;
          }
          let userData: any = Object.values(snapshot.val())[0];
          if (userData?.password != password) {
            Alert.alert('Error', 'Invalid Password!');
            return false;
          }
          dispacth(saveUserData(userData));
          navigation.navigateData('DashboarUser');
        });
    } catch (error) {
      Alert.alert('Error', 'Not Found User');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => setemail(text)}
        value={email}
        placeholder="Enter Email"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={text => setpassword(text)}
        placeholder="Enter Password"
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={onLoginRDB}>
        <Text style={styles.buttonText}>LOGIN NOW</Text>
      </TouchableOpacity>
      <Text>value : {value}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispacth(increment())}>
        <Text style={styles.buttonText}>Increment</Text>
      </TouchableOpacity>
      <View>
        <Text style={{textAlign: 'center'}}>
          Not have account ?{' '}
          <Pressable onPress={() => navigation.navigateData('Register')}>
            <Text style={{fontWeight: 'bold'}}>Register</Text>
          </Pressable>
          Now!
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 30,
    marginVertical: 10,
    borderColor: 'green',
  },
  container: {
    marginHorizontal: 8,
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    borderRadius: 30,
    marginVertical: 10,
    backgroundColor: 'green',
    padding: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
