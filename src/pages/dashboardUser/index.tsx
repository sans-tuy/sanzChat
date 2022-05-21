import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import uuid from 'react-native-uuid';
import database, {firebase} from '@react-native-firebase/database';
import * as navigation from '../../config/router/rootNavigation';
import {useDispatch, useSelector} from 'react-redux';

const DashboardUser = () => {
  const [search, setsearch] = useState<string>('');
  const dispacth = useDispatch();
  const userData = useSelector((state: any) => state.counter.userData);
  const [allUser, setallUser] = useState<any>([]);
  const [allUserBackup, setallUserBackup] = useState<any>([]);

  // const { params } = props.route
  // const userData = params.userData

  useEffect(() => {
    getAllUser();
    console.log('all user : ', allUser);
    console.log('user data : ', userData);
  }, []);

  const getAllUser = () => {
    firebase
      .app()
      .database(
        'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
      )
      .ref('users/')
      .once('value')
      .then(snapshot => {
        console.log('all User data: ', Object.values(snapshot.val()));
        setallUser(
          Object.values(snapshot.val()).filter(
            (it: any) => it.id != userData.id,
          ),
        );
        setallUserBackup(
          Object.values(snapshot.val()).filter(
            (it: any) => it.id != userData.id,
          ),
        );
      });
  };

  const createChatList = (data: any) => {
    firebase
      .app()
      .database(
        'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
      )
      .ref('/chatlist/' + userData.id + '/' + data.id)
      .once('value')
      .then(snapshot => {
        console.log('User data chat list: ', snapshot.val());

        if (snapshot.val() == null) {
          let roomId = uuid.v4();
          let myData = {
            roomId,
            id: userData.id,
            username: userData.username,
            email: userData.email,
            lastMsg: '',
          };
          firebase
            .app()
            .database(
              'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
            )
            .ref('/chatlist/' + data.id + '/' + userData.id)
            .update(myData)
            .then(() => console.log('Data updated.'));

          delete data['password'];
          data.lastMsg = '';
          data.roomId = roomId;
          firebase
            .app()
            .database(
              'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
            )
            .ref('/chatlist/' + userData.id + '/' + data.id)
            .update(data)
            .then(() => console.log('Data updated.'));

          // navigation.navigate('ChatScreen', { receiverData: data, userData : userData });
          navigation.navigateData('Chat');
        } else {
          // navigation.navigate('ChatScreen', { receiverData: snapshot.val(), userData : userData });
          navigation.navigateData('Chat');
        }
      });
  };
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity onPress={() => createChatList(item)}>
        <View style={styles.card}>
          <Text style={styles.nameCard}>{item.username}</Text>
          {console.log('userdata: ', userData)}
        </View>
      </TouchableOpacity>
      //   <TouchableOpacity onPress={() => createChatList(item)}>
      //   <View style={styles.card}>
      //     <Text style={styles.nameCard}>{item.name}</Text>
      //   </View>
      // </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={allUser}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default DashboardUser;

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: '90%',
    marginLeft: 5,
    backgroundColor: 'white',
    borderColor: 'green',
    borderRadius: 10,
    justifyContent: 'center',
    height: 50,
    borderWidth: 2,
    marginTop: 10,
  },
  nameCard: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
