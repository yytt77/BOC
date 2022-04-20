import { View } from "react-native";
import { useSelector } from 'react-redux';

import Authorized from "./Authorized";
import UnAuthorized from "./UnAuthorized";

// replace return statement w/ Authorized to bypass
const App = function() {
  const state = useSelector(state => state);
  const user = useSelector((state) => state.user);

  console.log('PROPS ', state)
  // return (
  //   state.user.username ? (
  //     <Authorized />
  //   ) : (
  //     <UnAuthorized />
  //   )
  // )
  return <Authorized />
}

// const mapStateToProps = (state) => ({
//   user: state.user
// })

export default App;
