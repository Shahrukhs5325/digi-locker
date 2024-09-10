import { Platform } from "react-native";

export const FONT = {
    JuliusSansOne: {
        regular: 'JuliusSansOne-Regular',
        medium: 'JuliusSansOne-Regular',
        light: 'JuliusSansOne-Regular',
        thin: 'JuliusSansOne-Regular',
        bold: 'JuliusSansOne-Regular',
    },
    SpPro: {
        regular: 'SFPRODISPLAYREGULAR',
        medium: 'SFPRODISPLAYMEDIUM',
        light: 'SFPRODISPLAYMEDIUM',
        thin: 'SFPRODISPLAYMEDIUM',
        bold: 'SFPRODISPLAYBOLD',
    },
    Able: {
        regular: 'Abel-Regular',
        medium: 'Abel-Regular',
        light: 'Abel-Regular',
        thin: 'Abel-Regular',
        bold: 'Abel-Regular',
    }

};

export const fontConfig = {
    ios: {
        regular: {
            fontFamily: 'SFPRODISPLAYREGULAR',
            fontWeight: 'regular',
        },
        medium: {
            fontFamily: 'SFPRODISPLAYMEDIUM',
            fontWeight: 'medium',
        },
        light: {
            fontFamily: 'SFPRODISPLAYREGULAR',
            fontWeight: 'light',
        },
        thin: {
            fontFamily: 'SFPRODISPLAYREGULAR',
            fontWeight: 'thin',
        },
    },
    android: {
        regular: {
            fontFamily: 'SFPRODISPLAYREGULAR',
            fontWeight: 'regular',
        },
        medium: {
            fontFamily: 'SFPRODISPLAYMEDIUM',
            fontWeight: 'medium',
        },
        light: {
            fontFamily: 'SFPRODISPLAYREGULAR',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'SFPRODISPLAYREGULAR',
            fontWeight: 'thin',
        },
        bold: {
            fontFamily: 'SFPRODISPLAYBOLD',
            fontWeight: 'bold',
        },


    }
};
