import React, { useState } from 'react'
import { ReactElement } from "react";
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { 
    RegisterContainer as Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypeButtonsWrraper
} from "./styles";

enum TransactionType {
    up = 'Income',
    down = 'Outcome',
    noSelect = ''
}

export const Register = ():ReactElement => {

    const [transactionType, setTransactionType] = useState(TransactionType.noSelect)

    const handleSelectTransactionType = (type: TransactionType) => {
        return setTransactionType(type)
    }

    return (
        <Container>
            <Header>
                <Title>
                    Cadastro
                </Title>
            </Header>

            <Form>
                <Fields>
                    <Input 
                        placeholder='Nome'
                    />
                    <Input 
                        placeholder='Preço'
                    />
                    <TransactionTypeButtonsWrraper>
                        <TransactionTypeButton
                            isActive={transactionType === TransactionType.up}
                            type='up'
                            title='Entrada' 
                            onPress={() => handleSelectTransactionType(TransactionType.up)}
                        />
                        <TransactionTypeButton 
                            isActive={transactionType === TransactionType.down}
                            type='down'
                            title='Saída' 
                            onPress={() => handleSelectTransactionType(TransactionType.down)}
                        />
                    </TransactionTypeButtonsWrraper>
                </Fields>

                <Button title='Enviar'/>
            </Form>

        </Container>
    )
}