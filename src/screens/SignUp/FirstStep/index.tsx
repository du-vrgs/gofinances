import React, { ReactElement } from "react";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Button } from "../../../components/Form/Button";
import { RegisterInput } from "../../../components/Form/RegisterInput";
import { FormContent, HeaderContent, SignUpContainer, SubTitle, Title } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../interfaces";
import { alertError } from "../../../common/alertError";

export const SignUpFirstStep = ():ReactElement => {

    const navigation = useNavigation<NavigationProps>();
    const schema = yup.object().shape({
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().email('E-mail inválido').required('E-mail é obrigatório')
    })
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const handleNextStep = (formData: FormData) => {
        navigation.navigate('SignUpSecondStep', {
            userData: formData
        })
    }

    return (
        <SignUpContainer>
        <KeyboardAvoidingView enabled behavior='position'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <HeaderContent>
                    <Title>Crie sua conta{'\n'}de forma{'\n'}simples e rápida</Title>
                    <SubTitle>Adicione aqui seu{'\n'}Nome de Usuário e E-mail</SubTitle>
                </HeaderContent>

                <FormContent>
                    <RegisterInput 
                        iconName='user'
                        control={control}
                        name='name'
                        placeholder="Nome de usuário"
                    />
                    <RegisterInput 
                        iconName="mail"
                        control={control}
                        name='email'
                        placeholder="E-mail"
                        keyboardType='email-address'
                    />
                    <Button 
                        title='Próximo'
                        onPress={handleSubmit(handleNextStep, alertError)}
                    />
                </FormContent>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SignUpContainer>
    )
}