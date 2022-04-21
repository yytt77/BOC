import { StyleSheet } from "react-native";

export default StyleSheet.create({
  loginBar: {
    height: 90
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  top: {
    flex: 1,
    flexDirection: 'row'
  },
  backButton: {
    flex: 1,
    marginLeft: '65%',
    marginTop: '5%'
  },
  x: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  tabText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  tabLines: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginTop: 6
  }
});