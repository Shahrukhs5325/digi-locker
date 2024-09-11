import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { palette } from '../../theme/themes';
import PrimaryButton from '../../components/button/PrimaryButton';
import TextInputCust from '../../components/textInput/TextInput';
import { Auth } from 'aws-amplify';
import { handleCognitoError } from '../../constant/constFunction';
import { getCustomerByIdApi } from '../../api/user/userApi';
import { UserContext } from '../../context/user/UserContext';
import { getClientTheme } from '../../api/common/commonApi';
import { FONT } from '../../theme/fonts';

type Props = {};



const LoginScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailId, setEmailId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState("");

  React.useEffect(() => {

  }, []);

  const validate = () => {
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isEmailValid = EmailRegex.test(emailId);

    if (!emailId) {
      setErrors("Please enter email");
      return false;
    } else if (!isEmailValid) {
      setErrors("Please enter valid email");
      return false;
    } else if (password.length < 5) {
      setErrors("Password with 8 characters including 1 uppercase letter, 1 special character, and alphanumeric characters");
      return false;
    }

    return true;
  };

  const submitHandler = async () => {
    const val = validate()
    if (val) {
      try {
        setIsLoading(true);
        const user = await Auth.signIn(emailId?.toLowerCase(), password);
        if (user?.attributes) {
          console.log("***** cognito user *****", user?.attributes)
          const customerId = user?.attributes?.["custom:customerId"];
          getCustDetails(customerId);
          // setIsLoading(false);
        }
      } catch (error) {
        console.log('error signing in', error);
        const msg = handleCognitoError(error);
        setIsLoading(false);
        setErrors(msg);
      }
    }
    console.log("submit ", val);
    // val && navigation.replace("HomeScreen")
  }

  const getCustDetails = async (customerId: number | string) => {
    try {
      const user = await getCustomerByIdApi(customerId);
      if (user?.status === 200 && user?.data?.data) {
        console.log("***** Zaps user *****", user?.data?.data)

        await userContext.setUser(user?.data?.data);
        await getClientThemeApi(user?.data?.data?.correlationId)
        await navigation.replace("HomeScreen")
      } else {
        setIsLoading(false);
        // await AsyncStorage.clear();
      }
    } catch (error) {
      setIsLoading(false);
      console.log("get customer details ", error)
      // showSnackbar(t("toast.somethingWrong"), 'error')
    }
  }
  const getClientThemeApi = async (id: number | string) => {
    try {
      const res = await getClientTheme(id);
      if (res?.data?.data) {
        const theme = res?.data?.data?.customTheme
        console.log("/n**** Custom Theme Color **** ", theme);
        await userContext.secCustomTheme(palette);
      } else {
        console.log("\n**** Default Theme ****\n");
        await userContext.secCustomTheme(palette);
      }

    } catch (error) {
      await userContext.secCustomTheme(palette);
      console.log("\n**** Default Theme ****\n");
      console.log("getCustomerByIdApi err: ", error);
    }
  }

  return (
    <>
      <View style={styles.container}>

        <View style={{ alignItems: 'center', marginBottom: 50 }}>
          {/* <SABLogo /> */}
          {/* <Image
            source={require('../../assets/logo/SNB_Brandmark.png')}
            style={styles.img}
          /> */}


        </View>
        <Text style={styles.txtSty}>Login</Text>
        <View style={{ gap: 10 }}>
          <TextInputCust
            placeholder='Email'
            value={emailId}
            onChangeText={(text: any) => { setEmailId(text); setErrors("") }}
          />
          <TextInputCust
            placeholder='Password'
            value={password}
            onChangeText={(text: any) => { setPassword(text); setErrors("") }}
            secureTextEntry={false}
            right={<TextInputCust.Icon icon="eye" />}
          />
          <Text style={{ color: 'red', height: 36 }}>{errors}</Text>
        </View>
        <View style={{ gap: 30 }}>
          <PrimaryButton loading={isLoading} onPress={() => submitHandler()} >Sign In</PrimaryButton>
          <Text style={styles.txtforgtPass}>Forgot password?</Text>
        </View>
        <View >
          <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
            <Text style={styles.txtRegister}>Don’t have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerLogo}>
          <Text style={styles.txtBrand}>Powered by</Text>
          {/* <ZapsLogo /> */}
        </View>

      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    gap: 15
  },
  txtSty: {
    fontWeight: '400',
    color: palette.black,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 24,
  },
  containerLogo: {
    // flex: 1,
    width: '100%',
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: 0,
    alignItems: "center",
    gap: 6,
    marginTop: 30,
  },
  txtRegister: {
    textAlign: 'center',
    fontFamily: FONT.Able.regular,
    fontSize: 14,
    fontWeight: '400',
    color: palette.black,
  },
  txtforgtPass: {
    textAlign: 'center',
    color: palette.black,
    fontFamily: FONT.Able.regular,
    fontSize: 16,
    fontWeight: '400'
  },
  txtBrand: {
    textAlign: 'center',
    color: palette.black,
    fontFamily: FONT.Able.regular,
    fontSize: 14,
    fontWeight: '400'
  },
  img: {
    width: 182,
    height: 92,
  },

});


