import React from "react";
import { palette } from "../../theme/themes";
import { Button, FAB } from "react-native-paper";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BottomSheet from "../bottomsheet/BottomSheet";
import { useNavigation } from "@react-navigation/native";
import { postDocApi } from "../../api/doc/docApi";
import { Dropdown } from "react-native-paper-dropdown";
import { uploadFileOnPressHandler } from "../../util/util";

type FileAddBtnProps = {
    refRBSheet: any;
};

const OPTIONS = [
    { label: 'Passport', value: 'Passport', color: 'blue' },
    { label: 'Driving License', value: 'Driving License', color: 'blue' },
    { label: 'Global ID', value: 'Global ID', color: 'blue' },
];


const FileAddBtn: React.FC<FileAddBtnProps> = ({ refRBSheet }) => {
    const navigation = useNavigation();


    const [isLoading, setIsLoading] = React.useState(false);
    const [file, setFile] = React.useState<any>(null); // Adjusted type
    const [field, setField] = React.useState<string>('');


    const uploadDoc = async () => {
        try {
            setIsLoading(true);
            const payload = {
                file: 'pdf',
                userEmail: 'ezy@yopmail.com',
                fileName: file.name,
                docType: field,
            };

            const res = await postDocApi(payload);
            if (res) {
                console.log(res.data.message);
                navigation.navigate('SharedScreen');
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
            <BottomSheet refRBSheet={refRBSheet}>

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
                        <Button mode="contained-tonal" style={{}} onPress={() => uploadFileOnPressHandler(setFile)}>
                            {file?.name ? "Change file" : "Select file"}
                        </Button>

                        <Button mode="outlined" style={{}} onPress={uploadDoc}>
                            Upload Document
                        </Button>


                    </View>
                </ScrollView>
            </BottomSheet>


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



});