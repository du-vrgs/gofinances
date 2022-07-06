import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { AnyStyledComponent } from "styled-components";

export const DashboardContainer = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const HeaderWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({theme}) => theme.colors.primary};

    padding: 0 24px;

    justify-content: center;

`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`
export const Infos = styled.View`
    margin-left: 12px;
`
export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;

    border-radius: 8px;
`
export const Greeting = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
`
export const UserName = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.bold};
`

export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.secondary};
    font-size: 24px;
`