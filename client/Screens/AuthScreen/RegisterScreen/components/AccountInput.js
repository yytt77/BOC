import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import styles from '../../Styles';
import { API_IP } from '../../../../constants.js';
import { containsUpperCase, containsNumber, containsSpecial } from '../registerHelpers';
import { authLog } from '../../../../Redux/actions';
import { lightTheme, darkTheme } from '../../../../constants';
import { useFonts } from "expo-font";

const registrationEndpoint = `http://${API_IP}/user/addNewUser`;

export default function AccountInput() {
  const state = useSelector(state => state);
  const screen = useSelector(state => state.authScreen);
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

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
  const [current, setCurrent] = useState(() => {
    if (theme) {
      return lightTheme;
    } else {
      return darkTheme;
    }
  });

  const [fontsLoaded] = useFonts({
    comicSans: require('../../../../assets/fonts/comic.ttf')
  });

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
        });

        dispatch(authLog());
        alert('We\'ve sent you an activation email!\nPlease check your inbox.');
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
    let length = pw.length >= 8;
    let capital = containsUpperCase(pw);
    let num = containsNumber(pw);
    let special = containsSpecial(pw);

    if (!length) {
      setPasswordLength(<Text>Password must contain at least 8 characters.</Text>);
    } else {
      setPasswordLength(<></>);
    }

    if (!capital) {
      setPasswordCapital(<Text>Password must contain at least 1 capital letter.</Text>);
    } else {
      setPasswordCapital(<></>);
    }

    if (!num) {
      setPasswordNum(<Text>Password must contain at least 1 number.</Text>);
    } else {
      setPasswordNum(<></>);
    }

    if (!special) {
      setPasswordSpecial(<Text>Password must contain at least 1 special character.</Text>);
    } else {
      setPasswordSpecial(<></>);
    }

    if (length && capital && num && special) {
      return true;
    }
  }

  return (
    <View style={styles.fields}>
      <Text style={styles.fieldLabels}>Username</Text>
      <TextInput
        style={styles.field}
        accessibilityLabel="reg-username"
        onChangeText={text => setUsername(text)}
        autoCapitalize="none"
      />
      <Text style={styles.fieldLabels}>Email Address</Text>
      <TextInput
        style={styles.field}
        accessibilityLabel="reg-email"
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
      />
      <Text style={styles.fieldLabels}>Password</Text>
      <TextInput
        style={styles.field}
        accessibilityLabel="reg-pw1"
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        textContentType="oneTimeCode"
      />
      <Text style={styles.fieldLabels}>Password Again</Text>
      <TextInput
        style={styles.field}
        accessibilityLabel="reg-pw2"
        onChangeText={text => setConfirmPw(text)}
        secureTextEntry={true}
        textContentType="oneTimeCode"
      />
      <View style={styles.buttonContainer}>
        <Pressable
          title={'Sign Up'}
          style={[{ backgroundColor: current.buttonColor }, styles.button]}
          onPress={() => handleSignUp()}>
          <Text
            style={[{ color: current.tabIconInactive }, styles.buttonText]}>
            Sign Up
          </Text>
        </Pressable>
      </View>
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
