import React from "react"
import { 
    HightLightsCardContainer as Container,
    CardTitleContent,
    Title,
    Icon,
    AmmountContent,
    Ammount,
    LastTransaction,
} from "./styles"

interface Props {
    type: 'up' | 'down' | 'dollar';
    title: string;
    ammount: string;
    lastTransaction: string;
}
const ICON = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    dollar: "dollar-sign",
}

export const HighLightsCard = ({
    type,
    title,
    ammount,
    lastTransaction
}: Props) => {

    return (
    <Container type={type}>
        <CardTitleContent>
            <Title type={type}>{title}</Title>
            <Icon type={type} name={ICON[type]} />
        </CardTitleContent>

        <AmmountContent>
            <Ammount type={type}>
                {ammount}
            </Ammount>
            <LastTransaction type={type}>
                {lastTransaction}
            </LastTransaction>
        </AmmountContent>
    </Container>
)}