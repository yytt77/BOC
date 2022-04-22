import { StyleSheet } from "react-native";
import { palette } from '../../Utils/ColorScheme';

module.exports = StyleSheet.create({
  centeredView: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
  modalView: {
    margin: 20,
    marginTop: 140,
    borderRadius: 20,
    padding: 35,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: 300,
    height: 200,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
  },
  caption: {
    fontSize: 15,
    padding: 10,
    left: 45,
    marginTop: 20,
  },
  locationCaption: {
    color: '#FFFFFF',
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
  },
  checkbox: {
    margin: 8,
    borderWidth: 1,
  },
  checkBoxSection: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  captionSection: {
    flexDirection: 'row',
  },
  inputBox: {
    height: 150,
    width:310,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'azure',
    fontSize: 15,
    borderRadius:10,
    alignSelf: 'center',
    textAlignVertical: 'top'
  },
  post: {
    textAlign:'center',
    marginTop:5,
    paddingLeft : 10,
    paddingRight : 10,
    fontSize: 20,
  },
  postButton: {
    height: 60,
    width: 120,
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:10,
    borderWidth: 1,
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textStyle: {
  },
  logoImage: {
    width: 75,
    height: 30,
  },
});