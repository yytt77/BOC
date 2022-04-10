import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import axios from 'axios';

import { Register as styles } from '../Styles';
import { API_IP } from '../../../../constants.js';

const registrationEndpoint = `http://${API_IP}/user/addNewUser`;

export default function AccountInput() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const handleSignUp = async () => {
    let validatedUsername = validUsername(username);
    let validatedPasswords = matchingPasswords(password, confirmPw);

    if (validatedUsername && validatedPasswords) {
      try {
        // Must use HTTPS when deployed in order to keep pw safe
        const register = await axios.post(registrationEndpoint, {
          username: username,
          email: email,
          password: password
        })
      } catch (err) {
        console.log(err);
      }
    }
  }

  const validUsername = (username) => {
    let letters = username.split('');
    const valid = letters.every(letter => {
      return letter === letter.toLowerCase();
    })

    if (valid) {
      return true;
    } else {
      return false;
    }
  }

  const matchingPasswords = (pw1, pw2) => {
    if (pw1 !== pw2) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <View style={styles.fields}>
      <Text>Username</Text>
      <TextInput
        style={styles.field}
        onChangeText={text => setUsername(text)}
      />
      <Text>Email Address</Text>
      <TextInput
        style={styles.field}
        onChangeText={text => setEmail(text)}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.field}
        onChangeText={text => setPassword(text)}
      />
      <Text>Password Again</Text>
      <TextInput
        style={styles.field}
        onChangeText={text => setConfirmPw(text)}
      />
      <Button title={'Sign Up'} onPress={() => {handleSignUp()}}>Sign Up</Button>
    </View>
  )
}
