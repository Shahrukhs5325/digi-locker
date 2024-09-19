import React from "react";
import { palette } from "../../theme/themes";
import {  FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { uploadFileOnPressHandler } from "../../util/util";

type FileAddBtnProps = {
    setFile: (file: any) => void;
  };
  
  const FileAddBtn: React.FC<FileAddBtnProps> = ({setFile}) => {


    return (
        <FAB
            icon="plus"
            size='medium'
            style={styles.fab}
            color={palette.primaryDark}
            rippleColor={palette.bgCard}
            onPress={() => uploadFileOnPressHandler(setFile)} 
        />
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



});