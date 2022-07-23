import React, { ReactElement } from "react";
import { TextInputProps } from "react-native";
import { InputContainer } from "./style";

// type Props = TextInputProps;

interface Props extends TextInputProps {
    borderError: boolean;
}


export const Input = ({borderError, ...rest}: Props):ReactElement => {

    return (
        <InputContainer borderError={borderError} {...rest}/>
    )
}