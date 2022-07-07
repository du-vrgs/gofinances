import React from "react"
import { 
    HightLightsCardContainer as Container,
    CardTitleContent,
    Title,
    Icon,
    AmmountContent,
    Ammount,
    LastAmmount,
} from "./styles"

export const HighLightsCard = () => {

    return (
    <Container>
        <CardTitleContent>
            <Title>Entradas</Title>
            <Icon name="arrow-up-circle" />
        </CardTitleContent>

        <AmmountContent>
            <Ammount>
                R$ 17.400,00
            </Ammount>
            <LastAmmount>
                Última entrada dia 13 de abril
            </LastAmmount>
        </AmmountContent>
    </Container>
)}