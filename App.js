import React, {
  useCallback
} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  TouchableHighlight,
  PermissionsAndroid
} from 'react-native';
import * as RNFS from 'react-native-fs';


const App = () => {

  const requestStoragePermissions = useCallback(async () => {
    console.log("Downlogind file...");

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message:
            "The app needs permission to save the file.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile()
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }

  }, [downloadFile]);

  const downloadFile = useCallback(() => {
    
    var url = "https://cdn.memegenerator.es/imagenes/memes/full/18/33/18331544.jpg";

    const downloadFileOptions = {
      fromUrl: url,
      toFile: RNFS.DocumentDirectoryPath + '/memezaso.jpg',
      background: true,     // Continue the download in the background after the app terminates (iOS only)
    };
    RNFS.downloadFile(downloadFileOptions).promise
      .then(
        downloadResult => {
          console.log(">> ", downloadResult)
        }
      );

  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableHighlight onPress={Platform.OS === 'android' ? requestStoragePermissions : downloadFile}>
          <Text>Hola</Text>
        </TouchableHighlight>
      </SafeAreaView>
    </>
  );
};

export default App;
