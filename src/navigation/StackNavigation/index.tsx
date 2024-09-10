import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SplashScreen from "../../screen/splashScreen/SplashScreen";
import LoginScreen from "../../screen/auth/LoginScreen";
import RegisterScreen from "../../screen/auth/RegisterScreen";
import ValetServicesStoreScreen from "../../screen/valet/ValetServicesStoreScreen";
import ValetDetailsScreen from "../../screen/valet/ValetDetailsScreen";
import RedeemScreen from "../../screen/valet/RedeemScreen";
import SucessValetScreen from "../../screen/valet/SucessValetScreen";
import { RenderTabNavigation } from "../TabNavigation";
import TransactionDetailsScreen from "../../screen/transaction/valetParking/TransactionDetailsScreen";
import { UserContext } from "../../context/user/UserContext";
import AirportTransferScreen from "../../screen/airportTransfer/AirportTransferScreen";
import SucessAirportScreen from "../../screen/airportTransfer/SucessAirportScreen";
import AirportTransTransactionDetailsScreen from "../../screen/transaction/ariportTransfer/AirportTransTransactionDetailsScreen";
import ServiceScreen from "../../screen/service/ServiceScreen";
import TransactionScreen from "../../screen/transaction/valetParking/TransactionScreen";
import CommingSoonScreen from "../../screen/commingSoon/CommingSoonScreen";
import AirportServiceScreen from "../../screen/service/AirportServiceScreen";


const Stack = createStackNavigator();

const Navigation = () => {
  const userContext = React.useContext(UserContext);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: userContext?.customTheme?.primaryDark
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
        {/* <Stack.Screen
          name={"HomeScreen"}
          component={HomeScreen}
        /> */}
        <Stack.Screen
          name={"ServiceScreen"}
          component={ServiceScreen}
        />
        <Stack.Screen
          name={"AirportServiceScreen"}
          component={AirportServiceScreen}
        />
        <Stack.Screen
          name={"ValetServicesStoreScreen"}
          component={ValetServicesStoreScreen}
        />
        <Stack.Screen
          name={"ValetDetailsScreen"}
          component={ValetDetailsScreen}
        />
        <Stack.Screen
          name={"RedeemScreen"}
          component={RedeemScreen}
        />
        <Stack.Screen
          name={"SucessValetScreen"}
          component={SucessValetScreen}
        />
        <Stack.Screen
          name={"TransactionScreen"}
          component={TransactionScreen}
        />
        <Stack.Screen
          name={"TransactionDetailsScreen"}
          component={TransactionDetailsScreen}
        />
        <Stack.Screen
          name={"AirportTransferScreen"}
          component={AirportTransferScreen}
        />
        <Stack.Screen
          name={"SucessAirportScreen"}
          component={SucessAirportScreen}
        />
        <Stack.Screen
          name={"AirportTransTransactionDetailsScreen"}
          component={AirportTransTransactionDetailsScreen}
        />
        <Stack.Screen
          name={"CommingSoonScreen"}
          component={CommingSoonScreen}
        />


      </Stack.Navigator>
    </NavigationContainer >
  );
};


export default Navigation;
