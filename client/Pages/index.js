import { View } from "react-native";
import { connect } from 'react-redux';

import Authorized from "./Authorized";
import UnAuthorized from "./UnAuthorized";

// replace return statement w/ Authorized to bypass
// return <Authorized />
const App = function(props) {
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
