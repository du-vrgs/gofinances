import React, { ReactElement } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";


export const Loading = (): ReactElement => {

    const theme = useTheme();

    return (
        <ActivityIndicator 
            style={{flex: 1}} 
            size='large' 
            color={theme.colors.secondary_light}
        /> 
    )
}