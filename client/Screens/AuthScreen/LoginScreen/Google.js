import { Button, Text, View } from 'react-native';
import axios from 'axios';
import { login } from '../../../Redux/actions';
import { connect, useSelector, useDispatch } from 'react-redux';


import { API_IP_login } from '../../../constants.js';

const googleLoginEndpoint = `http://${API_IP_login}/oauth2/redirect/google`;

export default function googleOauth() {
  const dispatch = useDispatch();


  const handleGoogleOauth = async () => {
    console.log(googleLoginEndpoint);

    await axios.get(googleLoginEndpoint)
    .then(function (response) {
      console.log('successfully sent login data to backend');
      dispatch((login()));
    })
    .catch(function (error) {
      console.log('error sending login', error);
      console.log(error.response.data)
    });
  }

  return (
    <View>
    <Button title={'Sign in with Google'} onPress={() => handleGoogleOauth()}>Continue</Button>
    </View>
  )
}
