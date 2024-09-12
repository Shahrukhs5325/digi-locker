import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import { FONT } from "../../theme/fonts";
import HomeScreen from "../../screens/home/HomeScreen";
import AccountScreen from "../../screens/account/AccountScreen";

const Tab = createBottomTabNavigator();

export const RenderTabNavigation = () => {
    const userContext = React.useContext(UserContext);


    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    paddingHorizontal: 14,
                    backgroundColor: userContext?.customTheme?.bgCard,
                    borderColor: userContext?.customTheme?.bgCard,
                    marginTop: -20,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    height: 64,
                    shadowColor: "#FFF",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 5.62,
                    elevation: 7,
                },
                headerShown: false,
                tabBarShowLabel: true,
                tabBarLabelStyle: styles.lableSty,

            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={HomeScreen} />
            <Tab.Screen name="Issued" component={HomeScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    activeIconContainer: {
        backgroundColor: palette.bgCard,
        width: 78,
        height: 74,
        borderRadius: 90,
        alignItems: 'center',
        justifyContent: 'center',
        top: -6, // This will lift the active icon above others
        // shadowColor: '#5C8374',
        // shadowOffset: { width: 0, height: 10 },
        // shadowOpacity: 0.3,
        // shadowRadius: 10,
        // elevation: 1,
    },
    middleButtonContainer: {
        top: -2,
        width: 105,
        height: 100,
        borderRadius: 90,
        alignItems: 'center',
        paddingTop: 14,
    },
    middleButtonImage: {
        width: 48,
        height: 48,
    },
    lableSty: {
        fontFamily: FONT.JuliusSansOne.regular,
        color: palette.txtWhite,
        fontSize: 12,
        fontWeight: '400',
        paddingBottom: 4
    }
});