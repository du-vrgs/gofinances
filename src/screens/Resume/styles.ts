import styled from "styled-components/native";
import { PropsWithChildren } from "react";
import { ScrollViewProps } from "react-native";
import { BorderlessButton, BorderlessButtonProps, ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';

interface BordlessProps extends PropsWithChildren<BorderlessButtonProps> {
}

export const ResumeContainer = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary}
    
    width: 100%;
    height: ${RFValue(113)}px;
    padding-bottom: 19px;

    align-items: center;
    justify-content: flex-end;

`
export const Title = styled.Text`

    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`


export const ChartContent = styled.View`
    width: 100%;
    align-items: center;
    padding: 0px 24px;
`;
export const HistoryCardsContent = styled(ScrollView).attrs({
    vertical: true,
    showsVerticalScrollIndicator: false,
})<ScrollViewProps>`
    padding: 0px 24px;
    flex: .90; 
`;


export const SelectMonthContent = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 24px;
    padding-top: 24px;
`;
export const SelectMonthButton = styled(BorderlessButton)<BordlessProps>`
`;
export const SelectMonthIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
    font-family: ${({theme}) => theme.fonts.medium};
`;
export const MonthSelected = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;

export const NoRegisterContent = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
export const NoRegisterText = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text};
`;