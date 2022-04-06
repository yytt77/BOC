import { Text, View, TouchableOpacity } from 'react-native';
import API_IP from '../../../constants.js';

import axios from 'axios';

export default function RegisterScreen() {
  const onRegisterPress = () => {
    console.log('TEST')
    axios.post(`http://${API_IP}/addNewUser`, {
      test: 1,
      tests: 2
    }, {
      headers: {
        'Content-Type': 'text/json',
        'Accept': 'application/json'
      }
    })
    .then(res => {console.log(res)})
    .catch(err => {console.log(err)});
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => onRegisterPress()}>
        <Text>Register Screen</Text>
      </TouchableOpacity>
    </View>
  );
}