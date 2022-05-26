//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import {useSelector} from 'react-redux';
// create a component
const ChatHeader = (props: any) => {
  // const {data} = props;
  const receiverData = useSelector((state: any) => state.counter.receiverData);
  // const [lastSeen, setlastSeen] = useState('')
  console.log('data chat header: ', props);
  // const dummy = data;
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'#27AE60'}
        translucent={false}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <View style={styles.headerChatWrapper}>
          <Image
            style={styles.pp}
            source={require('../../assets/images/no-profile.png')}
          />
          <Text
            numberOfLines={1}
            style={{
              color: 'white',
              fontSize: 16,
              textTransform: 'capitalize',
            }}>
            {receiverData.username}
          </Text>
        </View>

        {/* <Text
                    style={{ color: COLORS.primaryBackground, fontSize: 10,fontFamily: FONTS.Regular }}
                >
                    {lastSeen}
                </Text> */}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#27AE60',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pp: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerChatWrapper: {
    flexDirection: 'row',
  },
});

//make this component available to the app
export default ChatHeader;
