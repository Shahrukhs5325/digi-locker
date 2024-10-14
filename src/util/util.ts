import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export const uploadFileOnPressHandler = async (setFile: (file: any) => void) => {
  try {
    const pickedFile = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
    });
    // console.log('pickedFile', pickedFile);
    setFile(pickedFile);

    await RNFS.readFile(pickedFile.uri, 'base64').then(data => {
      // console.log('base64', data);
    });
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('Document picker cancelled', err);
    } else {
      console.log('Document picker error', err);
      throw err;
    }
  }
};
