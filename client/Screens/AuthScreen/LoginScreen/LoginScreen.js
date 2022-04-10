import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import SignInInput from './AccountInput';
import { LoginScreen as styles } from '../RegisterScreen/Styles'
import { lightTheme, darkTheme } from '../../../constants';

const LoginScreen = function(props) {
  var theme;
  if (props.theme) {
    theme = lightTheme;
  } else {
    theme = darkTheme;
  }

  return (
    <View style={[{ backgroundColor: theme.pageColor }, styles.container]}>
      <View>
        <Text>Login container here</Text>
      </View>
      <SignInInput />
    </View>
  )
}

const mapStateToProps = (state) => ({
  theme: state.theme
})

export default connect(mapStateToProps, null)(LoginScreen);