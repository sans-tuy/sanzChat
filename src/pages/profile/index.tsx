import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {firebase} from '@react-native-firebase/database';
import {saveUserData} from '../../config/redux/reducer';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const Profile = () => {
  const dispacth = useDispatch();
  const userData = useSelector((state: any) => state.counter.userData);
  const [inputVisible, setinputVisible] = useState<boolean>(false);
  const [bio, setbio] = useState<string>(userData.bio);
  const [imageAvatar, setimageAvatar] = useState<string>(userData.avatar);
  const [id, setid] = useState<any | null>();
  const [response, setResponse] = useState<any>(null);
  const referenceStorage = storage();
  const getID = () => {
    firebase
      .app()
      .database(
        'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
      )
      .ref(`/users`)
      .orderByChild('id')
      .equalTo(userData.id)
      .once('value')
      .then(async snapshot => {
        setid(Object.keys(snapshot.val()));
        console.log(Object.keys(snapshot.val()));
      });
  };
  const chooseImage = React.useCallback((type, options) => {
    launchImageLibrary(options, setResponse);
  }, []);
  const editBio = () => {
    firebase
      .app()
      .database(
        'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
      )
      .ref(`/users/${id}`)
      .update({bio: bio})
      .then(() => console.log(`/users/${id}`));
  };

  useEffect(() => {
    getID();
    firebase
      .app()
      .database(
        'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
      )
      .ref('users/')
      .orderByChild('email')
      .equalTo(userData.email)
      .once('value')
      .then(async snapshot => {
        let userData: any = Object.values(snapshot.val())[0];
        dispacth(saveUserData(userData));
      });
  }, [imageAvatar]);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image source={{uri: imageAvatar}} style={styles.profile} />
        <TouchableOpacity
          onPress={() =>
            chooseImage('library', {
              maxHeight: 200,
              maxWidth: 200,
              selectionLimit: 0,
              mediaType: 'photo',
              includeBase64: false,
            })
          }>
          <Text>upload image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            // path to existing file on filesystem
            const pathToFile = response['assets'][0]['uri'];
            // uploads file
            await referenceStorage
              .ref(`/images/${userData.username}`)
              .putFile(pathToFile);
            const url = await referenceStorage
              .ref(`/images/${userData.username}`)
              .getDownloadURL();
            console.log('url downloads', url);
            await firebase
              .app()
              .database(
                'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
              )
              .ref(`/users/${id}`)
              .update({avatar: url})
              .then(() => {
                setimageAvatar(url);
                console.log(`avatar updated`);
              });
          }}>
          <Text>Post image</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Username : {userData.username}</Text>
        <Text>Email : {userData.email}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Bio : </Text>
          {!inputVisible && <Text>{bio}</Text>}
          {inputVisible && (
            <TextInput
              placeholder={userData.bio}
              value={bio}
              onChangeText={text => setbio(text)}
            />
          )}
        </View>
        <TouchableOpacity onPress={() => setinputVisible(!inputVisible)}>
          <Text>Edit</Text>
        </TouchableOpacity>
        {inputVisible && (
          <TouchableOpacity
            onPress={() => {
              editBio();
              setinputVisible(!inputVisible);
            }}>
            <Text>simpan</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profile: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  container: {
    margin: 20,
  },
});
