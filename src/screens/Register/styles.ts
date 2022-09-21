import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const RegisterContainer = styled.View`
    background-color: ${({theme}) => theme.colors.background};
    flex: 1;
`

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary}
    
    width: 100%;
    height: ${RFValue(113)}px;
    padding-bottom: 18px;

    align-items: center;
    justify-content: flex-end;
`
export const Title = styled.Text`

    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`

export const Form = styled.View`
    flex: 1;
    width: 100%;
    padding: 24px;

    justify-content: space-between;
`

export const Fields = styled.View``

export const TransactionTypeButtonsWrraper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    max-width: 100%;
    margin: 18px 0px;
`;