import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FileAddBtn from '../../components/button/FileAddBtn';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const refRBSheet = useRef();


  return (
    <View style={styles.container}>

      <FileAddBtn refRBSheet={refRBSheet} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },

});
