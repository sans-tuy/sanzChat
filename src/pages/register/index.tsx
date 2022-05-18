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

const Register = () => {
  const [email, setemail] = useState<string>('');
  const [password, setpassword] = useState<string>('');
  const [username, setusername] = useState<string>('');
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>LOGIN NOW</Text>
      </TouchableOpacity>
      <View>
        <Text style={{textAlign: 'center'}}>
          Have an account ?
          <Pressable onPress={() => Alert.alert('press')}>
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
