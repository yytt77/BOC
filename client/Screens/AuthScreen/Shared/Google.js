import { Button, Text, View } from 'react-native';
import axios from 'axios';

import { API_IP } from '../../../constants.js';

const googleRegEndpoint = `http://${API_IP}/user/auth/google`;

export default function Google() {
  const googleReg = async () => {
    try {
      // const register = await axios.get(googleRegEndpoint);
      console.log('G ', register);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    // button will include Twitter logo
    <View>
      <Button title="Register with Google" onPress={ () => googleReg() }>Register with Google</Button>
    </View>
  )
}
