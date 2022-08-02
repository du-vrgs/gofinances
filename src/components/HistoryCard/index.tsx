import React, { ReactElement } from "react";
import { 
    HistoryCardContainer,
    Title,
    Amount,
 } from "./styles";

interface Props {
    title: string;
    amount: string;
    color: string;
}

export const HistoryCard = ({
    title,
    amount,
    color
}: Props): ReactElement => {

    return (
        <HistoryCardContainer color={color}>
            <Title>
                {title}
            </Title>
            <Amount>
                {amount}
            </Amount>
        </HistoryCardContainer>
    )
}