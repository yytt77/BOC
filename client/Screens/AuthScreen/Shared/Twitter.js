import { useState } from 'react';
import { Button, Linking, Text, View } from 'react-native';
import axios from 'axios';

import { API_IP } from '../../../constants.js';

const twitterRegEndpoint = `http://${API_IP}/user/auth/twitter`;

export default function Twitter() {
  const [test, setTest] = useState(<></>);

  const twitterReg = async () => {
    // try {
    //   const register = await axios.get(twitterRegEndpoint);
    //   console.log('T ', register.data);
    //   await Linking.openURL(register.data);
    // } catch (err) {
    //   console.log(err);
    // }

    Linking.openURL(twitterRegEndpoint);
  }

  return (
    // button will include Twitter logo
    <View>
      <Button title="Register with Twitter" onPress={ () => twitterReg() }>Register with Twitter</Button>
      <Text>
        {test}
      </Text>
    </View>
  )
}
