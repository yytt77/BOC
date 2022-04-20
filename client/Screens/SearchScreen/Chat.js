import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Chat as styles, SearchBar as searchStyles } from "./Styles";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { palette } from "../../Utils/ColorScheme";
import ChatFeed from "./components/ChatFeed";
import { io } from "socket.io-client";
import { API_IP } from "../../constants";
const socketEndpoint = `http://${API_IP}`;

export default ({ navigation, route }) => {
  const state = useSelector((state) => state);
  const user = useSelector((state) => state.user);
  const [text, setText] = useState("");
  const [userData, setUserData] = useState(route.params);
  const [chatSocket, setChatSocket] = useState();
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  let sender = user.userInfo.username;
  let receiver = userData.userInfo.username;

  const submitChatMessage = () => {
    let message = text;
    chatSocket.emit("chat message", { sender, receiver, message });
    setText("");
  };

  useEffect(() => {
    const socket = io(socketEndpoint);
    socket.on(`${sender}${receiver}`, (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
    socket.on(`${receiver}${sender}`, (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
    setChatSocket(socket);
    return () => {
      // chatSocket.disconnect();
      setChatSocket(null);
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: palette(state.theme).pageColor },
      ]}
    >
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate("SearchBar")}
      >
        <Image
          source={require("../../assets/back.png")}
          fadeDuration={0}
          style={{ width: 10, height: 30, marginLeft: 10 }}
        />
      </TouchableOpacity>
      {userData.userInfo.username !== user.userInfo.username ? (
        <View>
          <TextInput
            style={[
              searchStyles.bar,
              { backgroundColor: palette(state.theme).searchBarColor },
            ]}
            value={text}
            placeholder={`Send message to ${userData.userInfo.username}`}
            placeholderTextColor={palette(state.theme).searchText}
            underlineColorAndroid="transparent"
            onChangeText={(txt) => setText(txt)}
            autoCapitalize="none"
            onSubmitEditing={() => {
              submitChatMessage();
            }}
          />
          <ScrollView
            style={styles.feed}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            <ChatFeed
              me={user.userInfo}
              other={userData.userInfo}
              messages={messages}
            />
          </ScrollView>
        </View>
      ) : (
        <View style={styles.chatError}>
          <Text style={styles.errorMessage}>
            Cannot Send Messages To Yourself
          </Text>
        </View>
      )}
    </View>
  );
};
