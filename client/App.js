import Authorized from "./Pages/Authorized";
import UnAuthorized from "./Pages/UnAuthorized";

export default function App() {
  const auth = true; //hardcoded
  return auth ? <Authorized/> : <UnAuthorized/>;
}

