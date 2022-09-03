import React, { ReactElement, useState } from "react";
import { TextInputProps } from "react-native";
import { Icon, IconContent, Input, RegisterInputContainer } from "./styles";
import { Feather } from "@expo/vector-icons";
import { Control, Controller } from "react-hook-form";


interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    control: Control;
    name: string;
}


export const RegisterInput = ({iconName, control, name, ...rest}: Props): ReactElement => {

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleOnChangeText = (value: string, onChange) => {
        setIsFilled(!!value.length)
        onChange(value)
    }

    return (
        <RegisterInputContainer isFocused={isFocused}>
            <IconContent>
                <Icon 
                    name={iconName} 
                    isFocused={isFocused || isFilled}
                />
            </IconContent>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value} }) => (
                    <Input 
                        {...rest}
                        value={value}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChangeText={(value) => handleOnChangeText(value, onChange)}
                    />
                )}
            />

        </RegisterInputContainer>
    )
}