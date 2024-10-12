import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Checkbox, Snackbar, Text, } from 'react-native-paper';
import { palette } from '../../theme/themes';
import PrimaryButton from '../../components/button/PrimaryButton';
import TextInputCust from '../../components/textInput/TextInput';
import { Auth, Hub } from 'aws-amplify';
import { handleCognitoError } from '../../constant/constFunction';
import { addCustomerPostApi } from '../../api/user/userApi';
import { UserContext } from '../../context/user/UserContext';
import { getActivationCodeDetails, getClientTheme } from '../../api/common/commonApi';
import { FONT } from '../../theme/fonts';

type Props = {};

export const PasswordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,}$)';


const RegisterScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSentOTP, setIsSentOTP] = React.useState(false);
  const [isTerm, setIsTerm] = React.useState(false);

  const [visible, setVisible] = React.useState(false);

  const [otp, setOTP] = React.useState("");
  const [formData, setFormData] = React.useState({
    firstName: 'Test',
    LastName: 'User',
    email: 'test4@yopmail.com',
    password: 'Test@123',
    mobileNo: '919922941798',
  });
  const [errors, setErrors] = React.useState("");


  React.useEffect(() => {
    setErrors("");
    setOTP("");
    // setIsSentOTP(false);
  }, [formData]);

  // React.useEffect(() => {
  //   isNameAsPer && setFormData({ ...formData, creditCardName: formData.firstName + " " + formData.LastName });
  //   !isNameAsPer && setFormData({ ...formData, creditCardName: "" });
  //   setErrors("");
  // }, [isNameAsPer]);

  const validate = () => {
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = new RegExp(PasswordRegex);

    const isPassValid = passRegex.test(formData.password);

    const isEmailValid = EmailRegex.test(formData.email);

    if (!formData?.firstName) {
      setErrors("Please enter first name");
      return false;
    } else if (!formData?.LastName) {
      setErrors("Please enter last name");
      return false;
    } else if (!formData?.email) {
      setErrors("Please enter email");
      return false;
    } else if (!isEmailValid) {
      setErrors("Please enter valid email");
      return false;
    } else if (!formData?.mobileNo) {
      setErrors("Please enter mobile number");
      return false;
    } else if (!formData.password || !isPassValid) {
      setErrors("Password with 8 characters including 1 uppercase letter, 1 special character, and alphanumeric characters");
      return false;
    }

    return true;
  };

  const onDismissSnackBar = () => setVisible(false);

  const submitHandler = () => {
    const val = validate()
    if (val) {
      signUpSubmit()
    }
  }



  const signUpSubmit = async () => {

    try {
      setIsLoading(true);
      const { user } = await Auth.signUp({
        username: formData.email,
        password: formData.password,
        attributes: {
          email: formData.email,
          name: formData?.firstName + " " + formData?.LastName,
        },
        autoSignIn: { enabled: true },
      });
      if (user) {
        console.log("------------ user sent otp---------------------", JSON.stringify(user));

        setIsSentOTP(true);
        // showSnackbar(t("toast.codeSentSuccessfully"), 'success')
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error signing up:', error);
      const msg = handleCognitoError(error)
      setIsLoading(false);
      setErrors(msg);
    }
  }

  const confirmSignUpHandler = async () => {
    try {
      setIsLoading(true);
      const user = await Auth.confirmSignUp(formData?.email, otp, {
        forceAliasCreation: false,
      });
      if (user === "SUCCESS") {
        listenToAutoSignInEvent();
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error confirming sign up', error);
      setErrors(error.ExpiredCodeException);
      const msg = handleCognitoError(error);
      setIsLoading(false);
      setErrors(msg);
      //  showSnackbar(msg, 'error')
    }
  }

  const listenToAutoSignInEvent = () => {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      if (event === 'autoSignIn') {
        const user = payload.data;
        console.log('****** autoSignIn ', JSON.stringify(user));
        addCustomer(user);

      } else if (event === 'autoSignIn_failure') {
        // redirect to sign in page
        navigation.replace("LoginScreen");
      }
    })
  }

  const addCustomer = async (user: any) => {
    try {
      setIsLoading(true);
      const payload = {
        userFirstName: formData?.firstName,
        userLastName: formData?.LastName,
        userEmail: formData?.email?.toLowerCase(),
        userPhoneNo: formData?.mobileNo,
        userDOB: "11-02-1990"
      };

      const res = await addCustomerPostApi(payload);

      if (res) {
        const user = res?.data;
        console.log("++++++++++ user added : ", user);
        // await userContext.setUser(payload);
        await userContext.setUser(user?.email);

        navigation.replace("HomeScreen");
      } else {
        navigation.replace("LoginScreen");
      }

    } catch (error) {
      setIsLoading(false);
      setErrors("something went wrong");

      console.log("error customer ", error.response.data)
    }
  }


  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor={palette.primaryDark}
          />
          {!isSentOTP ? <>
            <Text style={styles.txtSty}>SIGN UP</Text>
            <View style={{ gap: 10 }}>
              <TextInputCust
                placeholder='First name'
                value={formData.firstName}
                onChangeText={value => {
                  setFormData({ ...formData, firstName: value });
                  setErrors("");
                }}
              />
              <TextInputCust
                placeholder='Last name'
                value={formData.LastName}
                onChangeText={value => {
                  setFormData({ ...formData, LastName: value });
                  setErrors("");
                }}
              />
              <TextInputCust
                placeholder='Email'
                value={formData.email}
                onChangeText={value => {
                  setFormData({ ...formData, email: value });
                  setErrors("");
                }}
              />
              <TextInputCust
                placeholder='Mobile number'
                value={formData.mobileNo}
                onChangeText={value => {
                  setFormData({ ...formData, mobileNo: value });
                  setErrors("");
                }}
              />
              <TextInputCust
                placeholder='Password'
                value={formData.password}
                onChangeText={value => {
                  setFormData({ ...formData, password: value });
                  setErrors("");
                }}
                secureTextEntry={false}
                right={<TextInputCust.Icon icon="eye" />}
              />

              <Text style={{ color: 'red', fontSize: 13 }}>{errors}</Text>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Checkbox.Item
                status={isTerm ? "checked" : "unchecked"}
                onPress={() => setIsTerm(!isTerm)}
                uncheckedColor={palette.black}
                color={palette.primaryDark}
                labelStyle={styles.txtTextTitle}
                label='I accept the Terms & Conditions'
                position='leading'
              />
              {/* <Text style={styles.txtTerm} >I accept the</Text> */}
              {/* <Text style={[styles.txtTerm, { textDecorationLine: 'underline' }]}>Terms & Conditions </Text>
              <Text style={[styles.txtTerm, { textDecorationLine: 'underline' }]}>Privacy Policy</Text> */}
            </View>

            <PrimaryButton disabled={!isTerm || isLoading} loading={isLoading} onPress={() => submitHandler()}>Send OTP</PrimaryButton>


            <View style={styles.containerRegister}>
              <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
                <Text style={styles.txtSingIn}>Already have an account? Sign in</Text>
              </TouchableOpacity>
            </View>
          </>
            :
            <>
              <View style={{ gap: 20, marginVertical: 200 }}>
                <TextInputCust
                  placeholder='OTP'
                  value={otp}
                  onChangeText={value => {
                    setOTP(value);
                    setErrors("");
                  }}
                />

                <PrimaryButton disabled={otp.length < 6 || isLoading} loading={isLoading} onPress={() => confirmSignUpHandler()}>Login</PrimaryButton>


                <Text style={{ color: 'red', fontSize: 13 }}>{errors}</Text>
              </View>
            </>}
        </View>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {errors}
      </Snackbar>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    gap: 15,
    paddingBottom: 24
  },
  txtSty: {
    color: palette.black,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 24,
    fontWeight: '400'
  },
  txtCreditCardTitle: {
    letterSpacing: 3,
    color: palette.black,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 16,
    fontWeight: '400'
  },
  txtTextTitle: {
    fontFamily: FONT.Able.regular,
    color: palette.black,
    fontSize: 16,
    fontWeight: '400'
  },
  containerRegister: {
    alignSelf: "center",
  },
  txtTerm: {
    fontFamily: FONT.Able.regular,
    color: palette.black,
    fontSize: 16,
    fontWeight: '400',
  },
  txtSingIn: {
    textAlign: 'center',
    fontFamily: FONT.Able.regular,
    fontSize: 14,
    fontWeight: '400',
    color: palette.black,
  }

});


