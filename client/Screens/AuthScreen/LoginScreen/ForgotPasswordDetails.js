import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_IP_login } from '../../../constants.js';

const forgotEmailEndpoint = `http://${API_IP_login}/user/resetPassword`;

import { Register as styles } from '../RegisterScreen/Styles'

export default function ForgetPasswordDetails({navigation}){

  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const screen = useSelector(state => state.authScreen);

  const [email, setEmail] = useState('');
  let message = '';

  const handleSubmitEmail = async () => {
    console.log('submitted email');
    try {
    await axios.post(forgotEmailEndpoint, {
       email: email,
     });

    message = 'We sent password recover link to your email address.'
   } catch (err) {
     console.log(err);
   }
  }

  return(


    <View style={styles.fields}>
        <Text>Enter your email Address</Text>
      <TextInput
        style={styles.field}
        onChangeText={text => setEmail(text)}

      />
            <Button title={'Submit email'} onPress={() => handleSubmitEmail()}>Submit Email</Button>
            <Text>{message}</Text>
      </View>
  )
}