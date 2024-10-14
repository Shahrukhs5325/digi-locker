import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export const uploadFileOnPressHandler = async (setFile: (file: any) => void, setBase64File: (file: any) => void) => {
  try {
    const pickedFile = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
    });
    // console.log('pickedFile', pickedFile);
    setFile(pickedFile);

    await RNFS.readFile(pickedFile.uri, 'base64').then(data => {
      setBase64File(data);
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


export const downloadFileHandler = (url: string) => {
  // const url = 'https://www.example.com/example.pdf';
  const filePath = RNFS.DocumentDirectoryPath + "EzyGen/";

  RNFS.downloadFile({
    fromUrl: url,
    toFile: filePath,
    background: false, // Enable downloading in the background (iOS only)
    discretionary: true, // Allow the OS to control the timing and speed (iOS only)
    progress: (res) => {
      // Handle download progress updates if needed
      const progress = (res.bytesWritten / res.contentLength) * 100;
      console.log(`Progress: ${progress.toFixed(2)}%`);
    },
  })
    .promise.then((response) => {
      console.log('File downloaded!', response);
    })
    .catch((err) => {
      console.log('Download error:', err);
    });
};
