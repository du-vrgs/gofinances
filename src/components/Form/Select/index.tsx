import React, { ReactElement } from "react";
import { TouchableOpacityProps } from "react-native";
import { Category, Icon, SelectContainer } from "./styles";

interface Props extends TouchableOpacityProps {
    category: string;
}

export const Select = ({category, ...rest}: Props): ReactElement => {

    return (
        <SelectContainer {...rest} activeOpacity={0.7}>
            <Category>
                {category}
            </Category>
            <Icon name='chevron-down'/>
        </SelectContainer>
    )
}