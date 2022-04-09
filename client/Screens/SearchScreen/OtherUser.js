import { Text, TouchableOpacity, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { OtherUser as styles } from "./Styles";
import FeedTemplate from "../../Templates/FeedTemplate";
import HeaderTemplate from "../../Templates/HeaderTemplate";
import { colorTheme1, API_IP } from "../../constants";
import axios from "axios";
const userEndpoint = `http://${API_IP}/user/getUser/`;
const followEndpoint = `http://${API_IP}/user/followUser`;

import BlockContent from "./components/BlockContent";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../Redux/actions";

export default function OtherUser({ route, navigation }) {
  const [userData, setUserData] = useState(route.params);
  const user = useSelector((state) => state.user);
  const [blocked, setBlocked] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let targetUser = userData.userInfo.username;
    let userFollowing = user.userInfo.following;
    if (targetUser === user.userInfo.username) setBlocked(false);
    for (let { followedUser } of userFollowing) {
      if (targetUser === followedUser) {
        setBlocked(false);
        return;
      }
    }
  }, []);

  const updateReduxUser = async () => {
    try {
      const response = await axios.get(
        `${userEndpoint}${user.userInfo.username}`
      );
      if (response.data.userInfo) {
        dispatch(updateUser(response.data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const refreshCallback = async () => {
    try {
      const response = await axios.get(
        `${userEndpoint}${userData.userInfo.username}`
      );
      if (response.data.userInfo) {
        setUserData(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const follow = async () => {
    try {
      const followData = {
        username: user.userInfo.username,
        userProfPic: user.userInfo.profPhoto,
        followedUser: userData.userInfo.username,
        followedProfPic: userData.userInfo.profPhoto,
      };
      const response = await axios.post(followEndpoint, followData);
      if (response.data === "succesfully followed") setBlocked(false);
    } catch (err) {
      alert("Cannot Follow User at This Time");
      console.error(err);
    }
  };

  useEffect(() => {
    updateReduxUser();
    refreshCallback();
  }, [blocked]);

  return (
    <View
      style={[
        { backgroundColor: `${colorTheme1.pageColor}` },
        styles.container,
      ]}
    >
      <BlockContent
        following={blocked}
        navigation={navigation}
        setBlocked={setBlocked}
        follow={follow}
        blockedUser={userData.userInfo.username}
      />
      <TouchableOpacity style={styles.back} onPress={() => navigation.navigate("SearchBar")}>
        <Image
          source={require("../../assets/back.png")}
          fadeDuration={0}
          style={{ width: 10, height: 30, marginLeft: 10 }}
        />
      </TouchableOpacity>
      <View styles={styles.headerContainer}>
        <HeaderTemplate userData={userData}></HeaderTemplate>
      </View>
      <View styles={styles.feedContainer}>
        <FeedTemplate
          userData={userData.posts}
          refreshData={refreshCallback}
        ></FeedTemplate>
      </View>
    </View>
  );
}
