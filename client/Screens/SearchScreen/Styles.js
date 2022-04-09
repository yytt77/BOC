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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: 'white',
    borderRadius: 50
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
  },
  comicText: {
    fontFamily: 'comicSans'
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
