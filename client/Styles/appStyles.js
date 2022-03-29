import { StyleSheet } from "react-native";

export default StyleSheet.create({
  tabBarStyle: {
    display: "flex",
    backgroundColor: "white",
    position: "absolute",
    bottom: 30,
    marginHorizontal: 20,
    height: 60,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    paddingHorizontal: 20,
  },
  uploadCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  plus: {
    width: 20,
    height: 20,
    tintColor: 'white'
  }
});