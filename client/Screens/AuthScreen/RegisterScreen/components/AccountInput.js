import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import axios from 'axios';

import { Register as styles } from './Styles'

export default function AccountInput() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const handleSignUp = () => {
    let validatedUsername = validUsername(username);
    let validatedPasswords = matchingPasswords(password, confirmPw);
    if (validatedUsername && validatedPasswords) {
      // validate through Passport
    } else {
      // render pw error message
    }
  }

  const validUsername = (username) => {
    let letters = username.split('');
    letters.every(letter => {
      // Uppercase ASCII values
      letter >= 65 || letter <= 90 ? false : true;
    })

    letters && !existingUser(username) ? true : false;
  }

  const matchingPasswords = (pw1, pw2) => {
    pw1 !== pw2 ? false : true;
  }

  const existingUser = () => {
    // check db
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
      <Button title={'Sign Up'}>Sign Up</Button>
    </View>
  )
}
