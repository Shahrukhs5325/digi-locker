import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated, StatusBar, StyleSheet, View } from 'react-native';
import { palette } from '../../theme/themes';
import { UserContext } from '../../context/user/UserContext';
import { Text } from 'react-native-paper';
import { FONT } from '../../theme/fonts';

type Props = {};



const SplashScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);



  const [isLoginIn, setIsLoginIn] = React.useState(false);
  const [isLogoSpalsh, setIsLogoSpalsh] = React.useState(false);
  const imageScale = new Animated.Value(0.20);

  Animated.timing(imageScale, {
    toValue: 0.7,
    duration: 2000,
    useNativeDriver: false,
  }).start();

  React.useEffect(() => {
    timerSpalshFunction()
  }, []);



  const timerSpalshFunction = () => {
    const timerId = setTimeout(() => {
      setIsLogoSpalsh(true);
      navigation.navigate('LoginScreen');
    }, 3000);

    return () => clearTimeout(timerId);
  }



  return (
    <>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={palette.primaryDark}
        />

        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <Text style={styles.txtBrand}>Powered by</Text>

          </View>
        </View>

      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.white
  },
  containerLogo: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: "center",
    gap: 6
  },
  txtBrand: {
    textAlign: 'center',
    color: palette.black,
    fontFamily: FONT.Able.regular,
    fontSize: 14,
    fontWeight: '400'
  },
  image: {
    // width: 240,
    // height: "auto",
  },
  img: {
    width: 232,
    height: 92,
  },

});


