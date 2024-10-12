import React from "react";
import { palette } from "../../theme/themes";
import { Button, FAB } from "react-native-paper";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BottomSheet from "../bottomsheet/BottomSheet";
import { useNavigation } from "@react-navigation/native";
import { postDocApi } from "../../api/doc/docApi";
import { Dropdown } from "react-native-paper-dropdown";

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
            <BottomSheet refRBSheet={refRBSheet} index={0}>
                <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.txtTitleSty}>Home Screen</Text>
                        <View style={styles.fileSty}>
                            <Text style={styles.txtTitleSty}>{file?.name}</Text>
                        </View>
                        <Dropdown
                            label="Select document type"
                            options={OPTIONS}
                            value={field}
                            onSelect={setField}
                            menuContentStyle={styles.dropdown}
                        />
                        <Button mode="contained" style={{ marginTop: 100 }} onPress={uploadDoc}>
                            Upload Document
                        </Button>

                    </ScrollView>
                </View>
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
    },
    txtTitleSty: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        letterSpacing: 2,
    },
    fileSty: {
        backgroundColor: '#dcdcdc',
        marginVertical: 55,
        borderWidth: 1,
        padding: 5,
        borderColor: '#000',
    },
    dropdown: {
        backgroundColor: '#dcdcd2',
    },



});