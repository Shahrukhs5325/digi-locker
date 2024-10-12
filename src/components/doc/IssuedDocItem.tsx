import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import { Divider, Menu, Text } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";
import { deleteDocApi } from "../../api/doc/docApi";
import { useNavigation } from "@react-navigation/native";
import Octicons from 'react-native-vector-icons/Octicons';


const IssuedDocItem: React.FC<any> = ({ item, fetchData }) => {
    const userContext = React.useContext(UserContext);
    const navigation = useNavigation();

    const [visible, setVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const deleteDocomentHandler = async () => {
        setIsLoading(true);
        try {
            const payload = [
                {
                    "userEmail": item?.userEmail,
                    "uuid": item?.uuid,
                    "fileKey": item?.fileKey,
                }
            ];
            const response = await deleteDocApi(payload);
            fetchData();
            closeMenu();
        } catch (error) {
            console.error('Error deleteDocApi :', error);
        } finally {
            setIsLoading(false);
        }
    };

    const viewDocHandler = () => {
        closeMenu();
        navigation.navigate('PdfViewScreen', { doc: item });
    }

    return (
        <View style={styles.itemContainer}>
            <View style={{ width: '80%', }}>
                <Text style={styles.txtCatSty} numberOfLines={2}>{item.fileName}</Text>
                <Text style={styles.txtTitleSty}>{item.docType}</Text>
                <Text style={styles.txtCatSty}>{moment(item.createdDate).format("DD-MMM-YYYY hh:mm a")}</Text>
            </View>

            <>
                {item?.verificationStatus ?
                    <Octicons name={"verified"} size={24} color={"green"} /> : null}
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<TouchableOpacity onPress={() => openMenu()}>
                        <MaterialCommunityIcons name={'dots-vertical'} size={30} color={palette.black} />
                    </TouchableOpacity>}>
                    <Menu.Item onPress={() => { }} title="Share" />
                    <Menu.Item onPress={() => { viewDocHandler() }} title="View" />
                    <Menu.Item onPress={() => { }} title="Download" />
                    {/* <Divider /> */}
                    <Menu.Item onPress={() => { deleteDocomentHandler() }} title="Delete" />
                </Menu>
            </>

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
        alignItems: 'center',
        width: '100%'
    },
    txtTitleSty: {
        // fontFamily: FONT.Able.regular,
        fontSize: 16,
        fontWeight: '400',
        color: palette.black,
    },
    txtCatSty: {
        //  fontFamily: FONT.Able.regular,
        fontSize: 13,
        fontWeight: '400',
        color: palette.black,
    }
});

export default IssuedDocItem;