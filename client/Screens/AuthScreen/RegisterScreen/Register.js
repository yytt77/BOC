import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import AccountInput from './components/AccountInput';
import { Register as styles } from './Styles'
import { lightTheme, darkTheme } from '../../../constants';

// console.log(props.theme)
const RegisterScreen = function(props) {
  var theme;
  if (props.theme) {
    theme = lightTheme;
  } else {
    theme = darkTheme;
  }

  return (
    <View style={[{ backgroundColor: theme.pageColor }, styles.container]}>
      <View>
        <Text>Login and Register Container Here</Text>
      </View>
      <AccountInput />
    </View>
  )
}

const mapStateToProps = (state) => ({
  theme: state.theme
})

export default connect(mapStateToProps, null)(RegisterScreen);
