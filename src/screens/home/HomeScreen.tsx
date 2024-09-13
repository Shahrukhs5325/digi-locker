import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';
import { palette } from '../../theme/themes';
import FileAddBtn from '../../components/button/FileAddBtn';

type Props = {};



const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);


  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.txtTitleSty}>Home Screen</Text>
          </View>

        </ScrollView>

        <FileAddBtn onPress={() => console.log()} />
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


