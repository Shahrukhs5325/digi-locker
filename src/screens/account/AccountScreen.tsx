import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { UserContext } from '../../context/user/UserContext';
import { palette } from '../../theme/themes';
import { FONT } from '../../theme/fonts';
import { Auth } from 'aws-amplify';
import Feather from 'react-native-vector-icons/Feather';

type Props = {};



const AccountScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const [location, setLocation] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const signOut = async () => {
    try {
      setIsLoading(true);
      await Auth.signOut();
      await userContext.setUser(null);
      await userContext.secCustomTheme(palette);

      navigation.replace('LoginScreen');

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('error signing out: ', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View>
            <Text style={styles.txtTitleHeadSty}>Shared Documents</Text>
          </View> */}

          <View style={{ gap: 20, marginVertical: 18 }}>

            <TouchableOpacity>
              <View style={styles.itemContainer}>
                <View style={styles.iconView}>
                  <Feather name={'user'} size={22} color={palette.primaryDark} />
                </View>
                <Text style={styles.txtTitleSty}>My Profile</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SharedActivityScreen')}>
              <View style={styles.itemContainer}>
                <View style={styles.iconView}>
                  <Feather name={'external-link'} size={22} color={palette.primaryDark} />
                </View>
                <Text style={styles.txtTitleSty}>Shared Activity</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.itemContainer}>
                <View style={styles.iconView}>
                  <Feather name={'activity'} size={22} color={palette.primaryDark} />
                </View>
                <Text style={styles.txtTitleSty}>My Activity</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.itemContainer}>
              <View style={styles.iconView}>
                <Feather name={'settings'} size={22} color={palette.primaryDark} />
              </View>
              <Text style={styles.txtTitleSty}>Settings</Text>
            </View>

            <View style={styles.itemContainer}>
              <View style={styles.iconView}>
                <Feather name={'help'} size={22} color={palette.primaryDark} />
              </View>
              <Text style={styles.txtTitleSty}>Help</Text>
            </View>

            <View style={styles.itemContainer}>
              <View style={styles.iconView}>
                <Feather name={'info'} size={22} color={palette.primaryDark} />
              </View>
              <Text style={styles.txtTitleSty}>About</Text>
            </View>

            <TouchableOpacity onPress={signOut}>
              <View style={styles.itemContainer}>
                <View style={styles.iconView}>
                  <Feather name={'log-out'} size={22} color={palette.primaryDark} />
                </View>
                <Text style={styles.txtTitleSty}>Logout</Text>
              </View>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </View>
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  iconView: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.bgCard,
    borderRadius: 90

  },
  txtTitleHeadSty: {
    fontFamily: FONT.Able.regular,
    fontSize: 18,
    fontWeight: '700',
    color: palette.black,
    letterSpacing: 2,
  },
  itemContainer: {
    // borderBottomWidth: 1,
    // borderColor: palette.black,
    // padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  txtTitleSty: {
    fontFamily: FONT.Able.regular,
    fontSize: 16,
    fontWeight: '400',
    color: palette.black,
  },
  txtCatSty: {
    //  fontFamily: FONT.Able.regular,
    fontSize: 14,
    fontWeight: '400',
    color: palette.black,
  }


});


