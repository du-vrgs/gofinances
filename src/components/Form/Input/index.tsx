import React, { ReactElement } from "react";
import { TextInputProps } from "react-native";
import { InputContainer } from "./style";

type Props = TextInputProps;

export const Input = ({...rest}: Props):ReactElement => {

    return (
        <InputContainer {...rest}/>
    )
}