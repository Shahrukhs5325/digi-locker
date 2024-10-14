import React from "react";
import { palette } from "../../theme/themes";
import { Button, FAB, Snackbar } from "react-native-paper";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BottomSheet from "../bottomsheet/BottomSheet";
import { useNavigation } from "@react-navigation/native";
import { uploadDocApi, verifyDoctype } from "../../api/doc/docApi";
import { uploadFileOnPressHandler } from "../../util/util";
import { UserContext } from "../../context/user/UserContext";
import SelectDropdown from 'react-native-select-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import PrimaryButton from "./PrimaryButton";


type FileAddBtnProps = {
    refRBSheet: any;
    fetchData?: () => void;
};

const OPTIONS = [
    { label: 'Passport', value: 'Passport', color: 'blue' },
    { label: 'Driving Licence', value: 'Driving Licence', color: 'blue' },
    { label: 'Global ID', value: 'Global ID', color: 'blue' },
];


const FileAddBtn: React.FC<FileAddBtnProps> = ({ refRBSheet, fetchData }) => {
    const navigation = useNavigation();
    const userContext = React.useContext(UserContext);


    const [isLoading, setIsLoading] = React.useState(false);
    const [file, setFile] = React.useState<any>(null); // Adjusted type
    const [base64File, setBase64File] = React.useState<any>(null); // Adjusted type

    const [field, setField] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');


    const [visibleSnackBar, setVisibleSnackBar] = React.useState(false);

    const onToggleSnackBar = () => setVisibleSnackBar(!visibleSnackBar);

    const onDismissSnackBar = () => setVisibleSnackBar(false);

    const docVerifyHandler = async () => {
        if (!field) {
            setError("Select document type");
            return
        } else if (!file) {
            setError("Select file");
            return
        }
        try {
            setIsLoading(true);
            const payload = {
                fileBase64: base64File,
                docType: field?.value,
            };

            const res = await verifyDoctype(payload);
            if (res.status == 200) {
                console.log(res?.data?.docType);
                await uploadDoc(field?.value);
            }
        } catch (error) {
            uploadDoc("");
        } finally {
            setIsLoading(false);
        }
    };

    const uploadDoc = async (type: string) => {
        try {
            setIsLoading(true);
            const payload = {
                file: base64File,
                userEmail: userContext.user,
                fileName: file.name,
                docType: type,
            };

            const res = await uploadDocApi(payload);
            if (res.status == 200) {
                refRBSheet.current.close()
                onToggleSnackBar();
                setFile(null);
                fetchData()
                //navigation.navigate('SharedScreen');
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log('something went wrong', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <FAB
                icon="plus"
                size='medium'
                style={styles.fab}
                color={palette.primaryDark}
                rippleColor={palette.bgCard}
                onPress={() => refRBSheet.current.open()}
            />
            <BottomSheet refRBSheet={refRBSheet} height={440}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Text style={styles.txtTitleSty}>Upload File</Text>
                        <Text style={styles.txtFileSty}>{file?.name}</Text>
                        {/* <Dropdown
                            label="Select document type"
                            options={OPTIONS}
                            value={field}
                            onSelect={setField}
                            menuContentStyle={styles.dropdown}
                        /> */}
                        <SelectDropdown
                            data={OPTIONS}
                            onSelect={(selectedItem) => {
                                setField(selectedItem);
                                setError("");
                            }}
                            renderButton={(selectedItem) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        {field ? (
                                            <Text style={styles.txtSty}>
                                                {selectedItem
                                                    ? `${selectedItem?.label}  `
                                                    : "Select type"}
                                            </Text>
                                        ) : (
                                            <Text style={styles.txtSty}>
                                                {selectedItem
                                                    ? `${selectedItem?.label}`
                                                    : "Select type"}
                                            </Text>
                                        )}
                                        <Feather name={'chevron-down'} size={22} />

                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            ...styles.dropdownItemStyle,
                                            ...(isSelected && {
                                                backgroundColor: palette.primaryLight,
                                            }),
                                        }}>
                                        {field ? (
                                            <Text style={styles.txtSty}>
                                                {`${item?.label}`}
                                            </Text>
                                        ) : (
                                            <Text style={styles.txtSty}>
                                                {`${item?.label}`}
                                            </Text>
                                        )}
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />

                        <Button mode="outlined" style={{}}
                            disabled={isLoading}
                            onPress={() => { uploadFileOnPressHandler(setFile, setBase64File); setError(""); }}>
                            {file?.name ? "Change file" : "Select file"}
                        </Button>

                        <Text style={styles.errTxt}>{error}</Text>


                        {file?.name ? <PrimaryButton loading={isLoading} onPress={() => docVerifyHandler()} >
                            Upload File
                        </PrimaryButton> : null}

                    </View>
                </ScrollView>
            </BottomSheet>

            <Snackbar
                visible={visibleSnackBar}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        onDismissSnackBar()
                    },
                }}>
                File upload successfully
            </Snackbar>
        </>
    );
}



export default FileAddBtn;


const styles = StyleSheet.create({

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 10,
    },
    container: {
        flex: 1,
        margin: 16,
        gap: 16
    },
    errTxt: {
        fontSize: 13,
        fontWeight: '400',
        color: 'red',
    },
    txtTitleSty: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        letterSpacing: 1,
    },
    txtFileSty: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    },
    fileSty: {
        backgroundColor: '#dcdcdc',
        borderWidth: 1,
        padding: 5,
        borderColor: '#000',
    },
    dropdown: {
        backgroundColor: '#dcdcd2',
    },
    txtSty: {

    },
    dropdownButtonStyle: {
        width: "100%",
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#FFF',
        borderRadius: 4,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },



});