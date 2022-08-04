import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const SignInContainer = styled.View`
    flex: 1;
`;

export const HeaderContent = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};

    width: 100%;
    height: 70%;

    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${( { theme }) => theme.fonts.medium};
    font-size: ${RFValue(30)}px;
    color: ${({ theme }) => theme.colors.shape};
    
    text-align: center;
    width: ${RFValue(279)}px;
`;
export const SubTitle = styled.Text`
    font-family: ${( { theme }) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.shape};

    margin-top: 80px;
    width: ${RFValue(190)}px;
    text-align: center;
`;

export const FooterContent = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary};

    width: 100%;
    height: 30%;

    align-items: center;
`;

export const ButtonsWrapper = styled.View`
    margin-top: ${RFValue(-28)}px;
`;