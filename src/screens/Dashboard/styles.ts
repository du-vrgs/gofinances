import { DataListProps } from './index';
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { FlatList, FlatListProps } from "react-native";

export const DashboardContainer = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const HeaderWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFPercentage(8)}px;

`

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({theme}) => theme.colors.primary};

    padding: 0 24px;
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

export const ScrollHorizontalHightLightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 }
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(24)}px;
`

export const ScrollVerticalTransactionsCards = styled(
    FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>)
    .attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 }
})`
    flex: .75;
`
export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text_dark};
    margin-bottom: 18px;
    margin-top: ${RFPercentage(12)}px;
    padding-left: 24;

`