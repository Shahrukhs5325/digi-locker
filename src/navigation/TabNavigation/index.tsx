import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { UserContext } from "../../context/user/UserContext";
import HomeScreen from "../../screen/home/HomeScreen";
import HomeIcon from '../../assets/svg/tab/Home.svg';
import PriviligeIcon from '../../assets/svg/tab/Membership Card.svg';
import HistoryIcon from '../../assets/svg/tab/Order History.svg';
import AccountIcon from '../../assets/svg/tab/Test Account.svg';
import { palette } from "../../theme/themes";
import { FONT } from "../../theme/fonts";
import History from "../../screen/transaction/valetParking/History";
import ProfileScreen from "../../screen/profile/ProfileScreen";
import PrivilegeScreen from "../../screen/privilege/PrivilegeScreen";

const Tab = createBottomTabNavigator();

export const RenderTabNavigation = () => {
    const userContext = React.useContext(UserContext);

    // const CustomTabBarButton = ({ onPress }) => (
    //     <TouchableOpacity onPress={onPress} style={styles.middleButtonContainer}>
    //         <Image
    //             source={require('../../assets/bottomtab/middle-img.png')}
    //             style={styles.middleButtonImage}
    //         />
    //     </TouchableOpacity>
    // );

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
                tabBarIcon: ({ focused }) => {
                    let IconComponent;

                    if (route.name === "Home") {
                        IconComponent = focused ?
                            <View style={styles.activeIconContainer}>
                                <Image
                                    source={require('../../assets/bottomtab/middle-img.png')}
                                    style={styles.middleButtonImage}
                                />
                            </View>
                            : <HomeIcon width={26} height={26} />;
                    } else if (route.name === "Privileges") {
                        IconComponent = focused ?
                            <View style={styles.activeIconContainer}>
                                <Image
                                    source={require('../../assets/bottomtab/middle-img.png')}
                                    style={styles.middleButtonImage}
                                />
                            </View>
                            : <PriviligeIcon width={26} height={39} />;

                    } else if (route.name === "History") {
                        IconComponent = focused ?
                            <View style={styles.activeIconContainer}>
                                <Image
                                    source={require('../../assets/bottomtab/middle-img.png')}
                                    style={styles.middleButtonImage}
                                />
                            </View>
                            : <HistoryIcon width={26} height={39} />;
                    } else if (route.name === "Profile") {
                        IconComponent = focused ?
                            <View style={styles.activeIconContainer}>
                                <Image
                                    source={require('../../assets/bottomtab/middle-img.png')}
                                    style={styles.middleButtonImage}
                                />
                            </View>
                            : <AccountIcon width={26} height={26} />;
                    }

                    return IconComponent;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Privileges" component={PrivilegeScreen} />
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
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