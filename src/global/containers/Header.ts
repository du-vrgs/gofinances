import { RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const HeaderDefaultContainer = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({theme}) => theme.colors.primary};

    padding: 0 24px;
`;