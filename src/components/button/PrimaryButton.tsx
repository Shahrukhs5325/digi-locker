import React from "react";
import { palette } from "../../theme/themes";
import { Button } from "react-native-paper";
import { UserContext } from "../../context/user/UserContext";


interface Props {
    children?: React.ReactNode | any;
    onPress: () => void | any;
    mode?: string;
    disabled?: boolean | undefined;
    icon?: string;
    loading?: boolean | undefined;
    uppercase?: boolean | undefined;
}

const PrimaryButton: React.FC<Props> = ({
    children,
    onPress,
    disabled,
    uppercase,
    icon,
    loading,
}) => {

    return (

        <Button
            buttonColor={palette.primaryDark}
            textColor={palette.white}
            icon={icon}
            mode={"contained"}
            loading={loading}
            disabled={disabled}
            uppercase={uppercase ? true : false}
            onPress={() => { loading ? console.log("disable") : onPress() }}
            style={{ borderRadius: 10, height: 52, justifyContent: 'center', borderColor: palette.txtWhite, borderWidth: 1, }}
        >
            {children}
        </Button>
    );
}

export default PrimaryButton;
