import React, { ReactElement } from "react";
import { RectButtonProps } from "react-native-gesture-handler"
import { Feather } from "@expo/vector-icons"

import { Icon, IconButtonContent } from "./styles";

interface Props extends RectButtonProps {
    iconName: React.ComponentProps<typeof Feather>['name']
}

export const IconButton = ({ iconName, ...rest }: Props): ReactElement => {

    return (
        <IconButtonContent {...rest}>
            <Icon name={iconName} />
        </IconButtonContent>
    )
}