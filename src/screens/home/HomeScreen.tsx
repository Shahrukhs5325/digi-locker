import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';
import { palette } from '../../theme/themes';
import FileAddBtn from '../../components/button/FileAddBtn';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

type Props = {};



const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [file, setFile] = React.useState('');


  const uploadFileOnPressHandler = async () => {
    try {
      const pickedFile = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('pickedFile', pickedFile);
      setFile(pickedFile);

      await RNFS.readFile(pickedFile.uri, 'base64').then(data => {
        console.log('base64', data);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        console.log(error);
        throw err;
      }
    }
  };
 

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.txtTitleSty}>Home Screen</Text>
          </View>
          <Text style={styles.txtTitleSty}>{file?.name}</Text>
        </ScrollView>

        <FileAddBtn onPress={() => uploadFileOnPressHandler()} />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  txtTitleSty: {
    fontFamily: FONT.Able.regular,
    fontSize: 18,
    fontWeight: '700',
    color: palette.black,
    letterSpacing: 2,
  },




});


