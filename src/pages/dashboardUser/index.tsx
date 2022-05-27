import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  Pressable,
} from 'react-native';

import uuid from 'react-native-uuid';
import {firebase} from '@react-native-firebase/database';
import * as navigation from '../../config/router/rootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {saveReceiverData} from '../../config/redux/reducer';
import {useIsFocused} from '@react-navigation/native';

const DashboardUser = () => {
  const dispacth = useDispatch();
  const userData = useSelector((state: any) => state.counter.userData);
  const [allUser, setallUser] = useState<any[]>([]);
  const [allUserBackup, setallUserBackup] = useState<any>([]);
  const isFocus = useIsFocused();

  // const { params } = props.route
  // const userData = params.userData

  useEffect(() => {
    getAllUser();
    console.log('called');
  }, [isFocus]);

  const getAllUser = () => {
    console.log('get all');
    firebase
      .app()
      .database(
        'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
      )
      .ref(`chatlist/${userData.id}`)
      .once('value')
      .then(snapshot => {
        if (snapshot != null) {
          console.log('recent chat: ', Object.values(snapshot.val()));
          setallUser(
            Object.values(snapshot.val()).sort((a: any, b: any) =>
              a.sendTime < b.sendTime ? 1 : -1,
            ),
          );
          console.log('filter chat: ', allUser);
        }
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
          dispacth(saveReceiverData(data));
          navigation.navigateData('Chat');
        } else {
          // navigation.navigate('ChatScreen', { receiverData: snapshot.val(), userData : userData });
          dispacth(saveReceiverData(snapshot.val()));
          navigation.navigateData('Chat');
        }
      });
  };
  const renderItem = ({item}: any) => {
    return (
      <>
        <TouchableOpacity onPress={() => createChatList(item)}>
          <View style={styles.card}>
            <View style={styles.avatarChatWrapper}>
              <Image source={{uri: item.avatar}} style={styles.avatarChat} />
            </View>
            <View>
              <Text style={styles.nameCard}>{item.username}</Text>
              <Text>{item.bio}</Text>
            </View>
            {/* {console.log('userdata: ', userData)} */}
          </View>
        </TouchableOpacity>
      </>
      //   <TouchableOpacity onPress={() => createChatList(item)}>
      //   <View style={styles.card}>
      //     <Text style={styles.nameCard}>{item.name}</Text>
      //   </View>
      // </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', position: 'relative'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>SanzChat</Text>
        <View style={styles.iconHeaderWrapper}>
          <Image
            style={styles.iconHeader}
            source={require('../../assets/icon/bell.png')}
          />
          <TouchableOpacity onPress={() => navigation.navigateData('profile')}>
            <Image
              style={styles.iconHeaderProfile}
              source={{uri: userData.avatar}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={allUser}
        renderItem={renderItem}
      />
      <TouchableOpacity
        onPress={() => navigation.navigateData('AllUser')}
        style={styles.floatIconWrapper}>
        <Image
          style={styles.floatIcon}
          source={require('../../assets/icon/user.png')}
        />
      </TouchableOpacity>
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
    height: 50,
    borderWidth: 2,
    marginTop: 10,
    flexDirection: 'row',
  },
  nameCard: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  search: {
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  floatIcon: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
  floatIconWrapper: {
    width: 55,
    height: 55,
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  iconHeader: {
    width: 35,
    height: 35,
  },
  iconHeaderProfile: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  iconHeaderWrapper: {
    flexDirection: 'row',
  },
  avatarChat: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 15,
  },
  avatarChatWrapper: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
});
