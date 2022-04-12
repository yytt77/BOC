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
    let validatedEmail = validEmail(email);
    let validatedPasswords = validPassword(password, confirmPw);

    if (validatedUsername && validatedEmail && validatedPasswords) {
      try {
        // Must use HTTPS when deployed in order to keep pw safe
        const register = await axios.post(registrationEndpoint, {
          username: username.toLowerCase(),
          email: email,
          password: password
        })
        console.log('REGISTER ', register.data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const validUsername = (username) => {
    let letters = username.split('');

    if (username.length >= 2 && username.length <= 16) {
      return true;
    } else {
      // Will be replaced w/ rendered msg
      console.log('Username must be between 2 and 16 characters long.');
      return false;
    }
  }

  const validEmail = (email) => {
    if (email.split('@').length === 2) {
      let splitEmail = email.split('@');
      let left = splitEmail[0].split('.').length;
      let right = splitEmail[1].split('.').length;
      let leftMatch = left <= 2 && left > 0;
      let rightMatch = right <= 2 && right > 0;

      if (leftMatch && rightMatch) {
        return true;
      } else {
        return false;
      }
    } else {
      // Will be replaced w/ rendered msg
      console.log('Invalid email format.')
      return false;
    }
  }

  const validPassword = (pw1, pw2) => {
    if (pw1 === pw2) {
      return true;
    } else {
      // Will be replaced w/ rendered msg
      console.log('Passwords do not match.')
      return false;
    }
  }

  const passwordStrength = (pw) => {
    // if pw length is less than 8
    // doesn't contain an uppercase letter
    // contain a number
    // contain special char ?
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
