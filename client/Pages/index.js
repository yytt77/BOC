import { View } from "react-native";
import { connect } from 'react-redux';

import Authorized from "./Authorized";
import UnAuthorized from "./UnAuthorized";

const App = function(props) {
  console.log('PROPS ', props);
  return (
    props.user.username ? (
      <Authorized />
    ) : (
      <UnAuthorized />
    )
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, null)(App);
