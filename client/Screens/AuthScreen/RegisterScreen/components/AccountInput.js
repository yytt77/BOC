import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import axios from 'axios';

import { Register as styles } from '../Styles';
import { API_IP } from '../../../../constants.js';
import { containsUpperCase, containsNumber, containsSpecial } from '../registerHelpers';

const registrationEndpoint = `http://${API_IP}/user/addNewUser`;

export default function AccountInput() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(<></>);
  const [invalidEmail, setInvalidEmail] = useState(<></>);
  const [invalidPassword, setInvalidPassword] = useState(<></>);
  const [passwordLength, setPasswordLength] = useState(<></>);
  const [passwordCaptial, setPasswordCapital] = useState(<></>);
  const [passwordNum, setPasswordNum] = useState(<></>);
  const [passwordSpecial, setPasswordSpecial] = useState(<></>);

  const handleSignUp = async () => {
    let validatedUsername = validUsername(username);
    let validatedEmail = validEmail(email);
    let validatedPasswords = validPassword(password, confirmPw);
    let validatedPwStrength = strongPassword(password);

    if (validatedUsername && validatedEmail && validatedPasswords && validatedPwStrength) {
      try {
        // Must use HTTPS when deployed in order to keep pw safe
        const register = await axios.post(registrationEndpoint, {
          username: username.toLowerCase(),
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

    if (username.length >= 2 && username.length <= 16) {
      setInvalidUsername(<></>);
      return true;
    } else {
      setInvalidUsername(<Text>Username must be between 2 and 16 characters long.</Text>);
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
        setInvalidEmail(<></>);
        return true;
      } else {
        setInvalidEmail(<Text>Invalid email format.</Text>);
        return false;
      }
    } else {
      setInvalidEmail(<Text>Invalid email format.</Text>);
      return false;
    }
  }

  const validPassword = (pw1, pw2) => {
    if (pw1 === pw2) {
      setInvalidPassword(<></>)
      return true;
    } else {
      setInvalidPassword(<Text>Passwords do not match.</Text>)
      return false;
    }
  }

  const strongPassword = (pw) => {
    if (pw.length < 8) {
      setPasswordLength(<Text>Password must contain at least 8 characters.</Text>);
    } else {
      setPasswordLength(<></>);
    }

    if (!containsUpperCase(pw)) {
      setPasswordCapital(<Text>Password must contain at least 1 capital letter.</Text>);
    } else {
      setPasswordCapital(<></>);
    }

    if (!containsNumber(pw)) {
      setPasswordNum(<Text>Password must contain at least 1 number.</Text>);
    } else {
      setPasswordNum(<></>);
    }

    if (!containsSpecial(pw)) {
      setPasswordSpecial(<Text>Password must contain at least 1 special character.</Text>);
    } else {
      setPasswordSpecial(<></>);
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
      <Button title={'Sign Up'} onPress={() => { handleSignUp() }}>Sign Up</Button>
      {invalidUsername}
      {invalidEmail}
      {passwordLength}
      {passwordCaptial}
      {passwordNum}
      {passwordSpecial}
      {invalidPassword}
    </View>
  )
}
