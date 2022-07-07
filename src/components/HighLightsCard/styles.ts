import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from "@expo/vector-icons";


export const HightLightsCardContainer = styled.View`
    background-color: ${({theme}) => theme.colors.shape};
    width: ${RFValue(300)}px;
    padding: 18px 24px;
    border-radius: 8px;
    margin-right: 16px;
`

export const CardTitleContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${RFValue(24)}px;
`
export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.text_dark};
`
export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.success};
    font-size: ${RFValue(40)}px;
`

export const AmmountContent = styled.View`
`
export const Ammount = styled.Text`
    font-size: ${RFValue(24)}px;
    color: ${({theme}) => theme.colors.text_dark};
    font-family: ${({theme}) => theme.fonts.medium};
`
export const LastAmmount = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
`