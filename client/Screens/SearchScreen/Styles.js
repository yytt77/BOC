import { StyleSheet } from "react-native";

const SearchBar = StyleSheet.create({
  container: {
    flex: 1,
  },
  bar: {
    height: 50,
    paddingLeft: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: "white",
    borderRadius: 50,
  },
});

const OtherUser = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const BlockContent = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popUp: {
    backgroundColor: "white",
    height: 600,
    width: 340,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.5)",
    margin: 10,
    padding: 10,
    width: 200,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  message: {
    paddingBottom: 100,
  },
  text: {
    fontFamily: "comicSans",
    fontSize: 20,
  },
});

const Item = StyleSheet.create({
  historyLabel: {
    padding: 15,
    fontSize: 15,
    fontWeight: "100",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  clear: {
    color: "red",
  },
  item: {
    padding: 15,
    fontSize: 15,
    fontWeight: "100",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  historyItem: {
    padding: 15,
    fontSize: 15,
    fontWeight: "100",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  noProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  comicText: {
    fontFamily: "comicSans",
  },
  username: {
    fontSize: 18,
    paddingLeft: 10,
  },
  right: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const ItemSeparator = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    height: 1,
    width: 300,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
});

const Loading = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    padding: 15,
  },
});

const Chat = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatError: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
    fontSize: 20,
    fontFamily: "comicSans",
  },
  feed: {
    height: 600
  }
});

const Message = StyleSheet.create({
  chat: {
    flexDirection: "row",
    backgroundColor: "blue",
    width: 130,
    padding: 20,
    margin: 20,
    borderRadius: 50,
    justifyContent: 'center'
  },
  tail: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    position: "absolute",
    bottom: -10,
  },
  lTail: {
    borderLeftWidth: 10,
    borderRightWidth: 20,
    borderTopColor: "blue",
    left: 20
  },
  rTail: {
    borderLeftWidth: 20,
    borderRightWidth: 10,
    borderTopColor: "grey",
    right: 20
  },
  lProfileImage: {
    borderRadius: 50,
    marginLeft: 10
  },
  rProfileImage: {
    borderRadius: 50,
    alignSelf: "flex-end",
    marginRight: 10
  },
  profileImage: {
    width: 20,
    height: 20,
  },
  chatText: {
    fontFamily: "comicSans",
    fontSize: 15,
    color: "white"
  }
});

export {
  SearchBar,
  OtherUser,
  Item,
  ItemSeparator,
  Loading,
  BlockContent,
  Chat,
  Message,
};
