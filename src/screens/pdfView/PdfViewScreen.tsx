import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';


const PdfViewScreen: React.FC = ({ route }) => {
  const { doc } = route.params;
  const navigation = useNavigation();


  // const source = { uri: doc?.fileDownloadLink, cache: true };

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={{
          uri:doc?.fileDownloadLink,
          // uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default PdfViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }

});
