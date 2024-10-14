import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";
import Octicons from 'react-native-vector-icons/Octicons';
import { Menu, Text } from "react-native-paper";
import BottomSheet from "../bottomsheet/BottomSheet";
import ShareDeleteDoc from "../shere/ShareDeleteDoc";


const SharedDocItem: React.FC<any> = ({ item ,fetchData}) => {
    const navigation = useNavigation();
    const refRBSheet = useRef();

    const userContext = React.useContext(UserContext);

    const [visible, setVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const deleteShereDocomentHandler = () => {
        closeMenu();
        refRBSheet.current.open();
    };

    const viewDocHandler = () => {
        closeMenu();
        navigation.navigate('PdfViewScreen', { doc: item });
    }

    return (
        <>
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
                        <Menu.Item onPress={() => { viewDocHandler() }} title="View" />
                        <Menu.Item onPress={() => { }} title="Download" />
                        <Menu.Item onPress={() => { deleteShereDocomentHandler() }} title="Delete" />
                    </Menu>
                </>

            </View>
            <BottomSheet refRBSheet={refRBSheet} height={340}>
                <ShareDeleteDoc item={item} closeBottomSteet={() => refRBSheet.current.open()} fetchData={fetchData} />
            </BottomSheet>

        </>
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

export default SharedDocItem;