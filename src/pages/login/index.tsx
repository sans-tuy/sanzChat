import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Login = () => {
  const [email, setemail] = useState<string>('');
  const [password, setpassword] = useState<string>('');
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>LOGIN NOW</Text>
      </TouchableOpacity>
      <View>
        <Text style={{textAlign: 'center'}}>
          Not have account ? <Text style={{fontWeight: 'bold'}}>Register</Text>{' '}
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
