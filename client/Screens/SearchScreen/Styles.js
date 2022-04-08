import { StyleSheet } from "react-native";

const SearchBar = StyleSheet.create({
  container: {
    flex: 1,
  },
  bar: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    backgroundColor: "white",
  },
});

const OtherUser = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Item = StyleSheet.create({
  historyLabel: {
    padding: 15,
    fontSize: 15,
    fontWeight: "100",
    flexDirection: "row",
    justifyContent: "space-between",
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
  }
});

const ItemSeparator = StyleSheet.create({
  line: { height: 1, width: 500, backgroundColor: "white" },
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

export { SearchBar, OtherUser, Item, ItemSeparator, Loading };
