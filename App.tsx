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
import database, {
  firebase,
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';

const App = () => {
  firebase
    .app()
    .database(
      'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/mahasiswa')
    .on('value', snapshot => {
      console.log('User data: ', snapshot.val());
    });
  // const [Loading, setLoading] = useState<boolean>(true);
  // const [Key, setKey] = useState<object | null>(null);
  // const [PokeBag, setPokeBag] =
  //   useState<FirebaseDatabaseTypes.DataSnapshot | null>(null);
  // const GetData = (data: FirebaseDatabaseTypes.DataSnapshot) => {
  //   let keyFirebase = [];
  //   keyFirebase = Object.keys(data);
  //   setKey(keyFirebase);
  //   setPokeBag(data);
  // };
  // const fetchMahasiswa = () => {
  //   setLoading(true);
  //   const reference = firebase
  //     .app()
  //     .database(
  //       'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app/',
  //     )
  //     .ref('/mahasiswa')
  //     .on('value', snapshot => {
  //       console.log('User data: ', snapshot.val());
  //       GetData(snapshot.val());
  //       setLoading(false);
  //     });
  // };
  return <View></View>;
};

export default App;

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
