import React, { useState, ReactElement, useEffect } from 'react'
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native';
import * as yup from "yup"
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from "react-native-uuid"

import { useAuth } from '../../providers/AuthContext';

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
interface NavigationProps {
    navigate: (name: string) => void;
}

const schema = yup.object().shape({
    name: yup
    .string()
    .required('Nome é obrigatório'),
    amount: yup
    .number()
    .typeError('O valor deve ser numérico')
    .positive('Valor não pode ser negativo')
    .required('Preço é obrigatório')
})

export const Register = ():ReactElement => {

    const { storageTransactionsKey } = useAuth();
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    // const isValidInputs = Object.values(errors).length === 0;

    const navigation = useNavigation<NavigationProps>();

    const [selectCategoryOpen, setSelectCategoryOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });
    const [transactionType, setTransactionType] = useState(TransactionType.noSelect);

    const handleSelectTransactionType = (type: TransactionType) => {
        return setTransactionType(type)
    };
    const handleOpenSelectCategory = () => setSelectCategoryOpen(true);
    const handleCloseSelectCategory = () => setSelectCategoryOpen(false);
    const handleSelectCategory = (name: string) => setCategory({
        name: name,
        key: name
    });

    const resetFields = () => {
        setCategory({
            key: 'category',
            name: 'Categoria'
        })
        setTransactionType(TransactionType.noSelect);
        reset();
    }

    const handleRegister = async (form: FormData) => {

        const noTransactionTypeSelected = !transactionType;
        const noCategorySelected = category.key === 'category';

        if (noTransactionTypeSelected) {
            return Alert.alert('Selecione um tipo de transação');
        }
        if (noCategorySelected) {
            return Alert.alert('Selecione uma categoria');
        }

        try {
            const formData = {
                id: String(uuid.v4()),
                date: new Date(),
                name: form.name,
                amount: form.amount,
                type: transactionType,
                category: category.key
            };

            const storageTransactions = await AsyncStorage.getItem(storageTransactionsKey);
            const allTransactions = storageTransactions ? JSON.parse(storageTransactions) : [];
            const newTransactions = [...allTransactions, formData];
    
            await AsyncStorage.setItem(storageTransactionsKey, JSON.stringify(newTransactions)).then(() => {
                Alert.alert('Save successfully');
                resetFields();
                navigation.navigate('Listagem');
            })
        }
        catch (error: any) {
            Alert.alert('Erro ao salvar, tente novamente');
            console.log('[Register][handleSubmit][error]', error);
        }
 
    }

    // useEffect(() => {
    //     // const loadStorage = async () => {
    //     //     const storage = await AsyncStorage.getItem(storageTransactionsKey);
    //     //     console.log(JSON.parse(storage!));
    //     // };

    //     // loadStorage();

    //     // const removeStorage = async () => await AsyncStorage.removeItem(storageTransactionsKey);
    //     // removeStorage();
    // }, [])

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
                        // enabled={!isValidInputs}
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