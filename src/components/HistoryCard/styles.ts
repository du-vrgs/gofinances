import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

interface CardProps {
    color: string;
}

export const HistoryCardContainer = styled.View<CardProps>`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 5px;
    background-color: ${({ theme }) => theme.colors.shape};
    padding: 12px 24px;
    border-radius: 6px;
    border-left-width: 5px;
    border-left-color: ${({ color }) => color};

    margin-left: 12px;
    height: 50px;
    width: 260px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;
`;
export const Amount = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(15)}px;
`;