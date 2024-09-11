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
            icon={icon}
            mode={"contained"}
            loading={loading}
            disabled={disabled}
            uppercase={uppercase ? true : false}
            onPress={() => onPress()}
            style={{
                borderRadius: 6, height: 52, justifyContent: 'center',
                borderColor: palette.primaryDark,
                borderWidth: 1,
            }}
            buttonColor={palette.txtWhite}
            textColor={palette.primaryDark}

        >
            {children}
        </Button>
    );
}

export default PrimaryButton;
