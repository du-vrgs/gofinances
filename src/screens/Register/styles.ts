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
    padding-bottom: 19px;

    align-items: center;
    justify-content: flex-end;

`
export const Title = styled.Text`

    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;

`