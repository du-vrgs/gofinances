import React, { ReactElement } from "react";
import { categories } from "../../utils/categories";
import { 
    TransactionCardContainer as Container,
    Title,
    Ammount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from "./styled";

export interface TransactionCardProps {
    type: 'Income' | 'Outcome';
    name: string;
    amount: string;
    category: string;
    date: string;
}
interface Props {
    data: TransactionCardProps;
}

export const TransactionCard = ({data}: Props): ReactElement => {

    const categoryIcon = categories.filter((category) => category.name === data.category)[0].icon

    return (
        <Container>
            <Title>{data.name}</Title>
            <Ammount type={data.type}>
                {data.type === 'Outcome' && '- '}
                {data.amount}
            </Ammount>

            <Footer>
                <Category>
                    <Icon name={categoryIcon}/>
                    <CategoryName>
                        {data.category}
                    </CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}