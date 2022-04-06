import { useState, useEffect } from 'react';
import { StyleSheet, Button, Image, Text, View, Platform, TouchableOpacity, TextInput, Alert, Modal, Pressable} from 'react-native';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';


export default function Upload() {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSelected, setSelection] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true,
    });
    // let result2 = await ImagePickergetPendingResultAsync({
    // });
    console.log('result', result);
    // console.log('result2', ImagePicker);
    if (!result.cancelled) {
      setImage(result.uri);
    }
    setModalVisible(!modalVisible);
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true,
    });

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
    // locationPicker();
    setModalVisible(!modalVisible);
  }

  const locationPicker = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    setSelection(true);

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
    });
    let gps = await Location.reverseGeocodeAsync({
      latitude : location.coords.latitude,
      longitude : location.coords.longitude
    })
    // let address = await Location.geocodeAsync({
    // })
    setLocation(location);
    console.log('thisis', location);
    // console.log('address', address);
    console.log('we have city', gps[0].city, '    ', gps[0].region);

  }

  return (
    <View style={styles.centeredView}>
       <View style={styles.container}>
        <Text style={styles.header}> Post Your Pets</Text>
        <Pressable
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          {image === null ? <FontAwesome name="image" style={styles.icon} size={100} /> : <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />}
        </Pressable>
        <Text style={styles.caption}>Caption </Text>
          <TextInput
            style={styles.inputBox}
            // style={{ height: 150, width: 300, backgroundColor: 'azure', fontSize: 15 }}
            placeholder="Say something about your pet!"
            onChangeText={(text) => setText({ text })}
            multiline={true}
          />
        <View style={styles.checkBoxSection}>
          <Checkbox
            value={isSelected}
            onValueChange={locationPicker}
            style={styles.checkbox}
            color={isSelected? '#4630EB' : undefined}
          />
          <Text style={styles.locationCaption}>Share Location</Text>
        </View>
        <TouchableOpacity
              style={styles.postButton}
              // onPress={() => navigate('HomeScreen')}
              underlayColor='#fff'>
              <Text style={styles.post}>Post</Text>
        </TouchableOpacity>
       </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={pickImage}
            >
            <Text style={styles.textStyle}>Pick From Photos Gallary</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={openCamera}
            >
            <Text style={styles.textStyle}>Pick From Camera roll</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#84C0FB',
  },
  container: {
    flex: 1,
    backgroundColor: '#84C0FB',
    marginTop: 80,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#2196F3",
  },  icon: {
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
  }
});
