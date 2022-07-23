import React, { useState, ReactElement} from 'react'
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"

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

const schema = yup.object().shape({
    name: yup
    .string()
    .required('Nome é obrigatório'),
    amount: yup
    .number()
    .typeError('O valor deve ser numérico')
    .positive('Valor não pode ser negativo')
})

export const Register = ():ReactElement => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

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

        const noTransactionTypeSelected = !transactionType;
        const noCategorySelected = category.key === 'category'

        if (noTransactionTypeSelected) {
            return Alert.alert('Selecione um tipo de transação')
        }
        if (noCategorySelected) {
            return Alert.alert('Selecione uma categoria')
        }

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
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            control={control}
                            name='amount'
                            placeholder='Preço'
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
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