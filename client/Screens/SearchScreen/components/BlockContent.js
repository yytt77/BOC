import { Modal, View, Text, TouchableOpacity } from "react-native";
import { BlockContent as styles } from "../Styles";
import { useSelector } from "react-redux";

export default ({ following, navigation, setBlocked, follow, blockedUser }) => {
  const user = useSelector((state) => state.user.userInfo.username);
  return (
    <Modal transparent visible={following} animationType="none">
      <View style={styles.container}>
        <View style={styles.popUp}>
          <View style={styles.message}>
            <Text style={styles.text}>Follow {blockedUser} to see their page</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchBar")}
            style={styles.button}
          >
            <Text style={styles.text}>Return to Search</Text>
          </TouchableOpacity>
          {user !== "defaultUser" ? (
            <TouchableOpacity
              onPress={async () => {
                follow();
              }}
              style={styles.button}
            >
              <Text style={styles.text}>Follow User</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text style={styles.text}>Error Connecting... Please try again later</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
