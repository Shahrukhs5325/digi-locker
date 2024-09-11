import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { palette } from '../../theme/themes';
import { PermissionsAndroid, Platform } from 'react-native';


type UserContextProviderType = {
    children?: React.ReactNode;
}

type UserType = {
    address: string;
    cityName: string;
    correlationId: number;
    countryId: number;
    customerId: number;
    customerName: string;
    email: string;
    employeeId: string;
    errorMsg: string;
    phoneNo: string;
    pinCode: string;
    stateId: number;
    statusId: number;
    statusName: number;
    userName: string;
    userTypeId: number;

}


type UserContextType = {
    user?: any;
    setUser?: any;
    location?: any;
    setLocation?: any;
    appLanguage?: any;
    setAppLanguage?: any;
    geoLocation?: any;
    seGeoLocation?: any;
    customTheme?: any;
    secCustomTheme?: any;
}

export const UserContext = React.createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderType) => {

    const [user, setUser] = React.useState<UserType | null>(null);
    const [appLanguage, setAppLanguage] = React.useState<string | null>("en");
    const [geoLocation, seGeoLocation] = React.useState<string | null>(null);
    const [customTheme, secCustomTheme] = React.useState<any | null>(palette);


    return (
        <UserContext.Provider value={{ user, setUser, appLanguage, setAppLanguage, geoLocation, seGeoLocation, customTheme, secCustomTheme }}>
            {children}
        </UserContext.Provider>
    );
}
