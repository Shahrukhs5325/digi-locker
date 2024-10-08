import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { UserContext } from "../../context/user/UserContext";
import SplashScreen from "../../screens/splashScreen/SplashScreen";
import { palette } from "../../theme/themes";
import LoginScreen from "../../screens/auth/LoginScreen";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import HomeScreen from "../../screens/home/HomeScreen";
import { RenderTabNavigation } from "../TabNavigation";


const Stack = createStackNavigator();

const Navigation = () => {
  const userContext = React.useContext(UserContext);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: palette.white
    },
  };



  return (
    <NavigationContainer theme={MyTheme} >
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen
          name={"SplashScreen"}
          component={SplashScreen}
        />
        <Stack.Screen
          name={"LoginScreen"}
          component={LoginScreen}
        />
        <Stack.Screen
          name={"RegisterScreen"}
          component={RegisterScreen}
        />
        <Stack.Screen
          name={"HomeScreen"}
          component={RenderTabNavigation}
        />



      </Stack.Navigator>
    </NavigationContainer >
  );
};


export default Navigation;
