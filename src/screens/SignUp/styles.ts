import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const SignUpContainer = styled.View`
    flex: 1;
    padding: 24px;
    background-color: ${({ theme }) => theme.colors.secondary_light};
`;

export const HeaderContent = styled.View`
    height: ${RFValue(200)}px;
    justify-content: center;
`;
export const Title = styled.Text`
    font-family: ${( { theme }) => theme.fonts.medium};
    font-size: ${RFValue(30)}px;
    color: ${({ theme }) => theme.colors.shape};
`;
export const SubTitle = styled.Text`
    font-family: ${( { theme }) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export const FormContent = styled.View`
    width: ${RFValue(300)}px;
    margin: 0 auto;
    margin-top: 120px;
`;
