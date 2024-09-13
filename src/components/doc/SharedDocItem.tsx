import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import { Text } from "react-native-paper";
import { FONT } from "../../theme/fonts";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const SharedDocItem: React.FC<any> = ({ item }) => {
    const userContext = React.useContext(UserContext);



    return (
        <View style={styles.itemContainer}>
            <View>
                <Text style={styles.txtTitleSty}>{item.name}</Text>
                <Text style={styles.txtCatSty}>{item.category}</Text>
                <Text style={styles.txtCatSty}>{item.sharedFrom}</Text>
            </View>
            <TouchableOpacity>
                <MaterialCommunityIcons name={'dots-vertical'} size={40} color={palette.black} />
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 1,
        borderColor: palette.black,
        padding: 12,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtTitleSty: {
        // fontFamily: FONT.Able.regular,
        fontSize: 16,
        fontWeight: '400',
        color: palette.black,
    },
    txtCatSty: {
        //  fontFamily: FONT.Able.regular,
        fontSize: 14,
        fontWeight: '400',
        color: palette.black,
    }
});

export default SharedDocItem;