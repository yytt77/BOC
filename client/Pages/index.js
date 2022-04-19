import { View } from "react-native";
import { connect } from 'react-redux';

import Authorized from "./Authorized";
import UnAuthorized from "./UnAuthorized";

// replace return statement w/ Authorized to bypass
const App = function(props) {
  // return (
  //   props.user.username ? (
  //     <Authorized />
  //   ) : (
  //     <UnAuthorized />
  //   )
  // )
  return <Authorized />
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, null)(App);
