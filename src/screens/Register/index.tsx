import React, { useState } from 'react'
import { ReactElement } from "react";
import { useForm } from 'react-hook-form';
import { Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button } from '../../components/Form/Button';
import { Select } from '../../components/Form/Select';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { InputForm } from '../../components/InputForm';
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

interface FormData {
    name: string;
    amount: string;
}

export const Register = ():ReactElement => {

    const { control, handleSubmit } = useForm();

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

    const handleRegister = (form: FormData) => {
        console.log({
            name: form.name,
            amount: form.amount,
            transactionType: transactionType,
            category: category.key
        })
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <Container>
                <Header>
                    <Title>
                        Cadastro
                    </Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            control={control}
                            name='name'
                            placeholder='Nome'
                        />
                        <InputForm
                            control={control}
                            name='amount'
                            placeholder='Preço'
                            keyboardType="numeric"
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

                    <Button 
                        title='Enviar' 
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={selectCategoryOpen}>
                    <CategorySelect 
                        category={category}
                        setCategory={handleSelectCategory}
                        closeSelectCategory={handleCloseSelectCategory}
                    />
                </Modal>

            </Container>
        </TouchableWithoutFeedback>
    )
}