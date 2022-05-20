import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import * as navigation from '../../config/router/rootNavigation';
import {firebase} from '@react-native-firebase/database';

const Register = ({navigasi}: any) => {
  const [email, setemail] = useState<string>('');
  const [password, setpassword] = useState<string>('');
  const [username, setusername] = useState<string>('');
  const onRegisterRDB = async () => {
    if (username === '' || password === '' || email === '') {
      Alert.alert('harap isi semua field');
      return false;
    }
    let data = {
      id: uuid.v4(),
      username: username,
      email: email,
      password: password,
    };
    try {
      firebase
        .app()
        .database(
          'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
        )
        .ref('/users')
        .push()
        .set(data)
        .then(() => {
          navigasi;
          Alert.alert('success, registrasi berhasil');
          setemail('');
          setpassword('');
          setusername('');
          navigation.navigateData('Login');
        });
    } catch (error: unknown) {
      console.log('Error', error);
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
      <TextInput
        value={username}
        onChangeText={text => setusername(text)}
        placeholder="Enter username"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={onRegisterRDB}>
        <Text style={styles.buttonText}>REGISTER NOW</Text>
      </TouchableOpacity>
      <View>
        <Text style={{textAlign: 'center'}}>
          Have an account ?
          <Pressable onPress={() => navigation.navigateData('Login')}>
            <Text style={{fontWeight: 'bold'}}>Login</Text>
          </Pressable>
          Now!
        </Text>
      </View>
    </View>
  );
};

export default Register;

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
