import { Modal, View, Text, TouchableOpacity } from "react-native";
import { BlockContent as styles } from "../Styles";
import { useSelector } from "react-redux";

export default ({ following, navigation, setBlocked, follow }) => {
  const user = useSelector((state) => state.user.userInfo.username);
  return (
    <Modal transparent visible={following} animationType="fade">
      <View style={styles.container}>
        <View style={styles.popUp}>
          <TouchableOpacity onPress={() => navigation.navigate("SearchBar")}>
            <Text>Return to Search</Text>
          </TouchableOpacity>
          {user !== "defaultUser" ? (
            <TouchableOpacity
              onPress={async () => {
                follow();
              }}
            >
              <Text>Follow User</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text>Error Connecting...Please try again later</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
