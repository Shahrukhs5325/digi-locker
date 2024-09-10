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
    buttonColor?: string | undefined;
}

const PrimaryButton: React.FC<Props> = ({
    children,
    onPress,
    mode,
    disabled,
    uppercase,
    icon,
    loading,
    buttonColor,
}) => {
    const userContext = React.useContext(UserContext);

    return (
        <Button
            icon={icon}
            mode={"contained"}
            loading={loading}
            // disabled={disabled}
            uppercase={false}
            onPress={() => { loading ? console.log("disable") : onPress() }}
            style={{
                borderRadius: 10, height: 52, justifyContent: 'center',
                borderColor: buttonColor === "dark" ? userContext?.customTheme?.txtWhite : palette.primaryDark,
                borderWidth: 1,
            }}
            buttonColor={buttonColor === "dark" ? userContext?.customTheme?.primaryDark : palette.txtWhite}
            textColor={buttonColor === "dark" ? palette.txtWhite : palette.primaryDark}

        >
            {children}
        </Button>
    );
}

export default PrimaryButton;
