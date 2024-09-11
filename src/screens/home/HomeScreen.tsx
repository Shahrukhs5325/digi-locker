import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { UserContext } from '../../context/user/UserContext';
import { palette } from '../../theme/themes';
import { FONT } from '../../theme/fonts';

type Props = {};

const ImageHeight = Math.round(Dimensions.get('window').width * 9 / 9);


const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const [location, setLocation] = React.useState(null);


   
  return (
    <>
      <View style={{
        flex: 1,
        backgroundColor: userContext?.customTheme?.primaryDark,
      }}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
           
          <View style={styles.compView}>
            <View>
              <Text style={styles.txtTitleSty}>Services you have</Text>
              
            </View>
            <View style={{ paddingBottom: 30 }}>
              <Text style={styles.txtTitleSty}>Services you have</Text>
            
            </View>
            <View style={{ paddingBottom: 30 }}>
              <Text style={styles.txtTitleSty}>expiring soon</Text>
              
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  compView: {
    padding: 10,
    gap: 26,
    marginTop: ImageHeight + 10,
    marginBottom: 30
  },
  txtTitleSty: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 16,
    fontWeight: '400',
    color: palette.txtWhite,
    textTransform: 'uppercase',
    letterSpacing: 3,
    paddingBottom: 12
  },



});


