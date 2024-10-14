import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../context/user/UserContext";
import { palette } from "../../theme/themes";
import { Menu, Text } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";
import { deleteDocApi, getDocViewLink } from "../../api/doc/docApi";
import { useNavigation } from "@react-navigation/native";
import Octicons from 'react-native-vector-icons/Octicons';
import BottomSheet from "../bottomsheet/BottomSheet";
import ShareForm from "../shere/ShareForm";
import Loader from "../loader/Loader";
import { downloadFileHandler } from "../../util/util";


const IssuedDocItem: React.FC<any> = ({ item, fetchData }) => {
    const userContext = React.useContext(UserContext);
    const navigation = useNavigation();
    const refRBSheet = useRef();

    const [visible, setVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [docData, setDocData] = React.useState();

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


    const shereDocomentHandler = () => {
        closeMenu();
        refRBSheet.current.open();
    };

    const viewDocHandler = () => {
        closeMenu();
        navigation.navigate('PdfViewScreen', { doc: item });
    }

    const getLinkViewHandler = async () => {
        setIsLoading(true);
        try {
            const payload = { userEmail: userContext.user, uuid: item?.uuid };
            const response = await getDocViewLink(payload);
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
            const payload = { userEmail: userContext.user, uuid: item?.uuid };
            const response = await getDocViewLink(payload);
            setDocData(response?.data);
            downloadFileHandler(response?.data?.fileUrl);
            closeMenu();
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
                    <Text style={styles.txtCatSty}>{item?.sharedStatus ? "Shared" : "Not Shared"}</Text>
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
                        <Menu.Item onPress={() => { shereDocomentHandler() }} title="Share" />
                        <Menu.Item onPress={() => { getLinkViewHandler() }} title="View" />
                        <Menu.Item onPress={() => { getLinkDownloadHandler() }} title="Download" />
                        <Menu.Item onPress={() => { deleteDocomentHandler() }} title="Delete" />
                    </Menu>
                </>

            </View>
            <BottomSheet refRBSheet={refRBSheet} height={540}>
                <ShareForm item={item} />
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

export default IssuedDocItem;