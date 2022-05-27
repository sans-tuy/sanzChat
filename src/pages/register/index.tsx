import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import * as navigation from '../../config/router/rootNavigation';
import {firebase} from '@react-native-firebase/database';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';

const Register = ({navigasi}: any) => {
  const [email, setemail] = useState<string>('');
  const [password, setpassword] = useState<string>('');
  const [username, setusername] = useState<string>('');
  const [bio, setbio] = useState<string>('');
  const [avatar, setavatar] = useState<string>('');
  const [response, setResponse] = useState<any>(null);
  const referenceStorage = storage();

  const chooseImage = React.useCallback((type, options) => {
    launchImageLibrary(options, setResponse);
  }, []);

  const onRegisterRDB = async () => {
    if (username === '' || password === '' || email === '' || bio === '') {
      Alert.alert('harap isi semua field');
      return false;
    }
    let data = {
      id: uuid.v4(),
      username: username,
      email: email,
      password: password,
      avatar:
        avatar === ''
          ? 'https://firebasestorage.googleapis.com/v0/b/sanzchat.appspot.com/o/images%2FdefaultImage?alt=media&token=d28c6340-5615-406a-843e-bed17a8e0674'
          : avatar,
      bio: bio,
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
          setbio('');
          setavatar('');
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
        value={bio}
        onChangeText={text => setbio(text)}
        placeholder="Enter Bio"
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
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          chooseImage('library', {
            maxHeight: 200,
            maxWidth: 200,
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
          })
        }>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          // path to existing file on filesystem
          const pathToFile = response['assets'][0]['uri'];
          // uploads file
          await referenceStorage.ref(`/images/${username}`).putFile(pathToFile);
          const url = await referenceStorage
            .ref(`/images/${username}`)
            .getDownloadURL();
          console.log('url downloads', url);
          setavatar(url);
        }}>
        <Text>Post image</Text>
      </TouchableOpacity>

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

interface Styles {
  container: ViewStyle;
  input: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
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
