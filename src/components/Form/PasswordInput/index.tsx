import React, { ReactElement, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { BorderlessButton } from "react-native-gesture-handler";
import { Icon, IconContent, Input, PasswordInputContainer } from "./styles";

interface Props {
    control: Control;
    name: string;
    placeholder?: string
}

export const PasswordInput = ({ control, name, placeholder }: Props): ReactElement => {

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [passVisible, setPassVisible] = useState(true);
    const eyeIcon = passVisible ? 'eye' : 'eye-off'

    const verifyIsFilled = (value: string) => {
        setIsFilled(!!value)
        setIsFocused(false);
    };

    return (
        <PasswordInputContainer isFocused={isFilled || isFocused}>
            <IconContent side="left">
                <Icon name='lock' isFocused={isFilled || isFocused}/>
            </IconContent>

            <Controller 
                name={name}
                control={control}
                render={({field: { onChange, onBlur, value }}) => (
                    <Input 
                        value={value}
                        placeholder={placeholder}
                        onChangeText={(text) => onChange(text)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => verifyIsFilled(value)}
                        secureTextEntry={passVisible}
                    />
                )}
            />

            <IconContent side='right'>
                <BorderlessButton onPress={() => setPassVisible(!passVisible)}>
                    <Icon name={eyeIcon} />
                </BorderlessButton>
            </IconContent>
        </PasswordInputContainer>
    )
}