import React, { ReactElement } from "react";
import { RectButtonProps, GestureHandlerRootView } from "react-native-gesture-handler";
import { Category, Icon, SelectContainer } from "./styles";

interface Props extends RectButtonProps {
    category: string;
}

export const Select = ({category, ...rest}: Props): ReactElement => {

    return (
        <GestureHandlerRootView>
            <SelectContainer {...rest}>
                <Category>
                    {category}
                </Category>
                <Icon name='chevron-down'/>
            </SelectContainer>
        </GestureHandlerRootView>
    )
}