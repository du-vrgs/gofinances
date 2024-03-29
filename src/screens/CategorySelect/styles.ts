import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from "styled-components/native";
import { HeaderDefaultContainer } from '../../global/containers/Header';

interface CategoryProps {
    isActive: boolean;
}

export const CategorySelectContainer = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderContent = styled(HeaderDefaultContainer)`
    align-items: center;
    justify-content: flex-end;
    height: ${RFValue(113)}px;
    padding-bottom: 18px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
    width: 100%;
    padding: ${RFValue(15)}px;

    flex-direction: row;
    align-items: center;

    ${({ isActive }) => isActive && css`
        background-color: ${({ theme }) => theme.colors.secondary_light};
    `}
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Separator = styled.Text`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    padding: 24px;
    padding-bottom: ${RFValue(18)}px;
`;

