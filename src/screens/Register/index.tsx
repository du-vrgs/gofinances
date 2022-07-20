import React, { useState } from 'react'
import { ReactElement } from "react";
import { Modal } from 'react-native';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { Select } from '../../components/Form/Select';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
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

    const [selectCategoryOpen, setSelectCategoryOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const [transactionType, setTransactionType] = useState(TransactionType.noSelect)

    const handleSelectTransactionType = (type: TransactionType) => {
        return setTransactionType(type)
    }

    const handleOpenSelectCategory = () => setSelectCategoryOpen(true);
    const handleCloseSelectCategory = () => setSelectCategoryOpen(false);
    const handleSelectCategory = (name: string) => setCategory({
        name: name,
        key: name
    })

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

                    <Select category={category.name} onPress={() => handleOpenSelectCategory()}/>
                </Fields>

                <Button title='Enviar'/>
            </Form>

            <Modal visible={selectCategoryOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={handleSelectCategory}
                    closeSelectCategory={handleCloseSelectCategory}
                />
            </Modal>

        </Container>
    )
}