import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from "react-native";
import styled from "styled-components/native";

export const InputContainer = styled(TextInput)`

    width: 100%;
    padding: 16px 18px;

    font-size: ${RFValue(14)}px;
    border-radius: 4px;

    background-color: ${({ theme }) => theme.colors.shape};
`