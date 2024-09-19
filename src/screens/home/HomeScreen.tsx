import React, { useRef } from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-paper-dropdown';
import {postDocApi} from '../../api/doc/docApi';
import FileAddBtn from '../../components/button/FileAddBtn';
import BottomSheet from '../../components/bottomsheet/BottomSheet';
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [file, setFile] = React.useState<any>(null); // Adjusted type
  const [field, setField] = React.useState<string>('');
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null); 

  const OPTIONS = [
    {label: 'Passport', value: 'Passport', color: 'blue'},
    {label: 'Driving License', value: 'Driving License', color: 'blue'},
    {label: 'Global ID', value: 'Global ID', color: 'blue'},
  ];

  const uploadDoc = async () => {
    try {
      setIsLoading(true);
      const payload = {
        file: 'pdf',
        userEmail: 'ezy@yopmail.com',
        fileName: file.name,
        docType: field,
      };

      const res = await postDocApi(payload);
      if (res) {
        console.log(res.data.message);
        navigation.navigate('SharedScreen');
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('something went wrong', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.txtTitleSty}>Home Screen</Text>
        <View style={styles.fileSty}>
          <Text style={styles.txtTitleSty}>{file?.name}</Text>
        </View>
        <Dropdown
          label="Select document type"
          options={OPTIONS}
          value={field}
          onSelect={setField}
          menuContentStyle={styles.dropdown}
        />
        <Button mode="contained" style={{marginTop: 100}} onPress={uploadDoc}>
          Upload Document
        </Button> 

     {/* <BottomSheet bottomSheetModalRef={bottomSheetModalRef} index={0}>
        <View>
            <Text>This is bottom sheet</Text>
        </View>
    </BottomSheet> */}
      </ScrollView>
      <FileAddBtn setFile={setFile}  />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  txtTitleSty: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 2,
  },
  fileSty: {
    backgroundColor: '#dcdcdc',
    marginVertical: 55,
    borderWidth: 1,
    padding: 5,
    borderColor: '#000',
  },
  dropdown: {
    backgroundColor: '#dcdcd2',
  },
});
