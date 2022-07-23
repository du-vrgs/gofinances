import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

interface Props {
    borderError: boolean;
}

export const InputContainer = styled(TextInput)<Props>`

    width: 100%;
    padding: 16px 18px;
    margin-bottom: 8px;

    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    border-radius: 4px;

    background-color: ${({ theme }) => theme.colors.shape};

    ${({ borderError, theme }) => borderError && css`
        border: 1px solid ${theme.colors.attention};
    `}
`