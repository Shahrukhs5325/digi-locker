import React from "react";
import { palette } from "../../theme/themes";
import { Button, FAB } from "react-native-paper";
import { UserContext } from "../../context/user/UserContext";
import { StyleSheet } from "react-native";

interface Props {
    onPress: () => void | any;

}

const FileAddBtn: React.FC<Props> = ({
    onPress,

}) => {
    const userContext = React.useContext(UserContext);

    return (
        <FAB
            icon="plus"
            size='medium'
            style={styles.fab}
            color={palette.primaryDark}
            rippleColor={palette.bgCard}
            onPress={() => onPress()}
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