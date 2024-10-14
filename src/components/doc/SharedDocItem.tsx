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
import { getSharedViewLink } from "../../api/doc/docApi";
import Loader from "../loader/Loader";


const SharedDocItem: React.FC<any> = ({ item, fetchData }) => {
    const navigation = useNavigation();
    const refRBSheet = useRef();

    const userContext = React.useContext(UserContext);

    const [visible, setVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [docData, setDocData] = React.useState();

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);


    const getLinkViewHandler = async () => {
        setIsLoading(true);
        try {
            const payload = { shareEmail: userContext.user, uuid: item?.uuid };
            const response = await getSharedViewLink(payload);
            setDocData(response?.data);
            closeMenu();
            navigation.navigate('PdfViewScreen', { doc: response?.data });
            //(response.data);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getLinkDownloadHandler = async () => {
        setIsLoading(true);
        try {
            const payload = { shareEmail: userContext.user, uuid: item?.uuid };
            const response = await getSharedViewLink(payload);
            setDocData(response?.data);
            closeMenu();
            // navigation.navigate('PdfViewScreen', { doc: data });
            //(response.data);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <>
            <View style={styles.itemContainer}>
                <View style={{ width: '80%', }}>
                    <Text style={styles.txtTitleSty} numberOfLines={2}>{item.fileName}</Text>
                    <Text style={styles.txtCatSty}>{item.senderEmail}</Text>
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
                        {item?.isViewAccess ? <Menu.Item onPress={() => { getLinkViewHandler() }} title="View" /> : null}
                        {item?.isDownloadAccess ? <Menu.Item onPress={() => { getLinkDownloadHandler() }} title="Download" /> : null}
                        {/* <Menu.Item onPress={() => { deleteShereDocomentHandler() }} title="Delete" /> */}
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