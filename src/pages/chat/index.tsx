import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  FlatList,
} from 'react-native';
import database, {firebase} from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
// import {GiftedChat} from 'react-native-gifted-chat';
import moment from 'moment';
// import {Icon} from 'native-base';
import SimpleToast from 'react-native-simple-toast';
import ChatHeader from '../../component/ChatHeader';
import MsgComponent from '../../component/msgComponent';
import {useIsFocused} from '@react-navigation/native';

type msgDataTypes = {
  roomId: string;
  message: string;
  from: string;
  to: string;
  sendTime: string | undefined;
  msgType: string;
  id: string | null;
};

const Chat = () => {
  // const { params } = props.route
  //   const receiverData = params.receiverData
  //   const userData = params.userData
  const dispacth = useDispatch();
  const receiverData = useSelector((state: any) => state.counter.receiverData);
  const userData = useSelector((state: any) => state.counter.userData);
  console.log('receiverData', receiverData);

  const [msg, setMsg] = useState<string>('');
  const [disabled, setdisabled] = useState<boolean>(false);
  const [allChat, setallChat] = useState<any>([]);
  const isFocus = useIsFocused();

  useEffect(() => {
    const onChildAdd = firebase
      .app()
      .database(
        'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
      )
      .ref('/messages/' + receiverData.roomId)
      .on('child_added', snapshot => {
        // console.log('A new node has been added', snapshot.val());
        setallChat((state: any) => [snapshot.val(), ...state]);
      });
    // Stop listening for updates when no longer required
    return () =>
      firebase
        .app()
        .database(
          'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
        )
        .ref('/messages' + receiverData.roomId)
        .off('child_added', onChildAdd);
  }, [receiverData.roomId, isFocus]);

  const msgvalid = (txt: string) => txt && txt.replace(/\s/g, '').length;
  const sendMsg = () => {
    if (msg == '' || msgvalid(msg) == 0) {
      SimpleToast.show('Enter something....');
      return false;
    }
    setdisabled(true);
    let msgData: msgDataTypes = {
      roomId: receiverData.roomId,
      message: msg,
      from: userData?.id,
      to: receiverData.id,
      sendTime: moment().format(''),
      msgType: 'text',
      id: null,
    };

    const newReference = firebase
      .app()
      .database(
        'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
      )
      .ref('/messages/' + receiverData.roomId)
      .push();
    msgData.id = newReference.key;
    newReference.set(msgData).then(() => {
      let chatListupdate = {
        lastMsg: msg,
        sendTime: msgData.sendTime,
      };
      firebase
        .app()
        .database(
          'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
        )
        .ref('/chatlist/' + receiverData?.id + '/' + userData?.id)
        .update(chatListupdate)
        .then(() => console.log('Data updated.'));
      console.log("'/chatlist/' + userData?.id + '/' + data?.id", receiverData);
      firebase
        .app()
        .database(
          'https://sanzchat-default-rtdb.asia-southeast1.firebasedatabase.app',
        )
        .ref('/chatlist/' + userData?.id + '/' + receiverData?.id)
        .update(chatListupdate)
        .then(() => console.log('Data updated.'));

      setMsg('');
      setdisabled(false);
    });
  };

  return (
    <View style={styles.container}>
      <ChatHeader data={receiverData} />
      <ImageBackground
        source={require('../../assets/images/background2.jpeg')}
        style={{flex: 1}}>
        <FlatList
          style={{flex: 1}}
          data={allChat}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          inverted
          renderItem={({item}) => {
            return (
              <MsgComponent sender={item.from == userData.id} item={item} />
            );
          }}
        />
      </ImageBackground>
      <View
        style={{
          backgroundColor: '#27AE60',
          elevation: 5,
          // height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 7,
          justifyContent: 'space-evenly',
          paddingBottom: 20,
        }}>
        <TextInput
          style={{
            backgroundColor: 'white',
            width: '80%',
            borderRadius: 25,
            borderWidth: 0.5,
            borderColor: 'white',
            paddingHorizontal: 15,
            color: 'black',
            paddingBottom: 10,
          }}
          placeholder="type a message"
          placeholderTextColor={'black'}
          multiline={true}
          value={msg}
          onChangeText={val => setMsg(val)}
        />

        <TouchableOpacity disabled={disabled} onPress={() => sendMsg()}>
          <Text style={{color: 'white'}}>Send!</Text>
          {/* <Icon
                        style={{
                            // marginHorizontal: 15,
                            color: COLORS.white,
                        }}
                        name="paper-plane-sharp"
                        type="Ionicons"
                    /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
