import { View } from "react-native";
import { connect } from 'react-redux';

import Authorized from "./Authorized";
import UnAuthorized from "./UnAuthorized";
import { store } from '../Redux/store';

const App = function(props) {
  return (
    props.user ? (
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
