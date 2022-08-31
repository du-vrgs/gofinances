import { Feather } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const IconButtonContent = styled(RectButton)`

`;

export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.secondary};
    font-size: 24px;
`;