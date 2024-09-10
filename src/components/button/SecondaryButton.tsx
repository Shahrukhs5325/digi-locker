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

const SecondaryButton: React.FC<Props> = ({
    children,
    onPress,
    mode,
    disabled,
    uppercase,
    icon,
    loading,
    buttonColor
}) => {
    const userContext = React.useContext(UserContext);

    return (
        <Button
            buttonColor={buttonColor === "light" ? palette.txtWhite : userContext?.customTheme?.primaryDark}
            textColor={buttonColor === "light" ? userContext?.customTheme?.primaryDark : palette.txtWhite}
            icon={icon}
            mode={"outlined"}
            loading={loading}
            //disabled={disabled}
            uppercase={false}
            onPress={() => { loading ? console.log("disable") : onPress() }}
            style={{ borderRadius: 10, height: 52, justifyContent: 'center', borderColor: palette.txtWhite, borderWidth: 1, }}
        >
            {children}
        </Button>
    );
}



export default SecondaryButton;
