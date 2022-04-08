import { View } from "react-native";
import { connect } from 'react-redux';

import Authorized from "./Authorized";
import UnAuthorized from "./UnAuthorized";

const App = function(props) {
  return (
    props.authorizedUser ? (
      <Authorized />
    ) : (
      <UnAuthorized />
    )
  )
}

const mapStateToProps = (state) => ({
  authorizedUser: state.authorizedUser
})

export default connect(mapStateToProps, null)(App);
