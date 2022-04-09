import { Modal, View, Text, TouchableOpacity } from "react-native";
import { BlockContent as styles } from "../Styles";


export default ({ following, navigation, setBlocked, follow }) => {

  return (
    <Modal transparent visible={following} animationType="fade">
      <View style={styles.container}>
        <View style={styles.popUp}>
          <TouchableOpacity onPress={() => navigation.navigate("SearchBar")}>
            <Text>Return to Search</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => {
            follow()
          }}><Text>Follow User</Text></TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
