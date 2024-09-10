import React from "react";
import { TextInput } from "react-native-paper";
import { palette } from "../../theme/themes";
import { KeyboardTypeOptions } from "react-native";

// sizes: "xs", "sm", "md", "lg"

interface Props {
    onChangeText?: (value: any) => void;
    placeholder?: string;
    disabled?: boolean | undefined;
    value?: string;
    error?: boolean;
    secureTextEntry?: boolean | undefined;
    right?: React.ReactNode;
    keyboardType?: KeyboardTypeOptions | undefined;
}

const TextInputCust: React.FC<Props> = ({
    onChangeText,
    placeholder,
    disabled,
    value,
    error,
    keyboardType,
    secureTextEntry,
    right

}) => {

    return (
        <TextInput
            placeholder={placeholder}
            mode='outlined'
            value={value}
            error={error}
            textColor={palette.txtWhite}
            disabled={disabled}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            style={{ borderWidth: 0, backgroundColor: palette.txtInputBg, borderRadius: 10 }}
            outlineStyle={{ borderWidth: 0 }}
            right={right}
            placeholderTextColor={palette.txtGray}


        />
    );
}

export default TextInputCust;
