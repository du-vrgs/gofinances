import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface Props {
    keyboardVisible: boolean;
}

export const SignInContainer = styled.View`
    flex: 1;
`;

export const HeaderContent = styled.View<Props>`
    background-color: ${({ theme }) => theme.colors.primary};

    width: 100%;
    height: ${({ keyboardVisible }) => keyboardVisible ? '50%' : '60%'};

    align-items: center;
    justify-content: flex-start;
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

    margin-top: 15px;
    width: ${RFValue(190)}px;
    text-align: center;
`;

export const FooterContent = styled.View<Props>`
    background-color: ${({ theme }) => theme.colors.secondary};

    width: 100%;
    height: ${({ keyboardVisible }) => keyboardVisible ? '50%' : '40%'};;

    align-items: center;
`;

export const FormWrapper = styled.View`
    width: ${RFValue(300)}px;
    margin-top: ${RFValue(-28)}px;
    align-items: center;
    flex: 1;
`;

export const LoginTypeButton = styled(RectButton)`
    margin-top: auto;
    margin-bottom: 24px;
`;

export const LoginTypeButtonText = styled.Text`
    font-family: ${( { theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.shape};
    text-align: center;
`;
