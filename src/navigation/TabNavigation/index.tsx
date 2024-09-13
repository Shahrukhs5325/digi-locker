import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AccountScreen from "../../screens/account/AccountScreen";
import HomeScreen from "../../screens/home/HomeScreen";
import IssuedScreen from "../../screens/issued/IssuedScreen";
import SharedScreen from "../../screens/shared/SharedScreen";
import { FONT } from "../../theme/fonts";
import { palette } from "../../theme/themes";

import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';




const Tab = createBottomTabNavigator();



export const RenderTabNavigation = () => {


    return (
        <Tab.Navigator
            initialRouteName="MarketPlace"
            screenOptions={() => ({

                tabBarStyle: {
                    paddingBottom: 5, paddingTop: 5,
                    // borderTopRightRadius: 20,
                    //  borderTopLeftRadius: 20,
                    // shadowColor: '#54336E24',
                    // boxShadow: "0px -4px 12px 0px #54336E24",
                    // shadowOpacity: 4,
                    height: 60,

                    shadowColor: "#000000",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 5.62,
                    elevation: 7
                },
                headerShown: false,
                tabBarActiveTintColor: palette.primaryDark,
                tabBarInactiveTintColor: palette.primaryLight,

            })}

        >

            <Tab.Screen
                name={"Home"}
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarLabelStyle: { fontWeight: "600", fontFamily: FONT.Able.bold },
                    tabBarIcon: ({ color }) => (
                        <Feather name={"home"} size={28} color={color} />
                    ),
                }}
            />



            <Tab.Screen
                name={"IssuedScreen"}
                component={IssuedScreen}
                options={{
                    tabBarLabel: "Issued",
                    tabBarLabelStyle: { fontWeight: "600", fontFamily: FONT.Able.bold },
                    tabBarIcon: ({ color }) => (
                        <Octicons name={"verified"} size={28} color={color} />
                    ),
                }}
            />



            <Tab.Screen
                name={"SharedScreen"}
                component={SharedScreen}
                options={{
                    tabBarLabel: "Shared",
                    tabBarLabelStyle: { fontWeight: "600", fontFamily: FONT.Able.bold },
                    tabBarIcon: ({ color }) => (
                        <Feather name={"share-2"} size={28} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name={"AccountScreen"}
                component={AccountScreen}
                options={{
                    tabBarLabel: "Account",
                    tabBarLabelStyle: { fontWeight: "600", fontFamily: FONT.Able.bold },
                    tabBarIcon: ({ color }) => (
                        <Feather name={"user"} size={28} color={color} />
                    ),
                }}
            />


        </Tab.Navigator>
    );
};