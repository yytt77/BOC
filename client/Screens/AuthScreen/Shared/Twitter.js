import { Button, Text, View } from 'react-native';
import axios from 'axios';

import { API_IP } from '../../../constants.js';

const twitterRegEndpoint = `http://${API_IP}/user/twitterUser`;

export default function Twitter() {
  const twitterReg = async () => {
    try {
      const register = await axios.post(twitterRegEndpoint, {});
      console.log('T ', register.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    // button will include Twitter logo
    <View>
      <Button title="Register with Twitter" onPress={ () => twitterReg() }>Register with Twitter</Button>
    </View>
  )
}
