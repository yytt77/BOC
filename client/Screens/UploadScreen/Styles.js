import { StyleSheet } from "react-native";
import { colorTheme1 } from '../../constants';

module.exports = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: `${colorTheme1.pageColor}`,
  },
  container: {
    flex: 1,
    backgroundColor: '#84C0FB',
    marginTop: 80,
  },
  modalView: {
    margin: 20,
    marginTop: 140,
    backgroundColor: "#84C0FB",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#84C0FB",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    backgroundColor: '#57D785',
    // borderRadius: 20,
    padding: 10,
    marginTop: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: 300,
    height: 200,
    borderRadius:10,
    borderColor: '#6E96BD',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonClose: {
    backgroundColor: "#57D785",
  },

  icon: {
    color: '#D6F7D6',
  },
  header: {
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
  },
  caption: {
    color: '#FFFFFF',
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
    backgroundColor: '#D6F7D6',
    borderWidth: 1,
  },
  checkBoxSection: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  captionSection: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  inputBox: {
    height: 150,
    width:310,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'azure',
    fontSize: 15,
    borderRadius:10,
    borderColor: '#6E96BD',
    alignSelf: 'center',
    textAlignVertical: 'top'
  },
  post: {
    color:'#D6F7D6',
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
    backgroundColor:'#57D785',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#6E96BD',
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#FEFB9F',
  },
  logoImage: {
    width: 75,
    height: 30,
  },
});