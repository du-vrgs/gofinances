import React, { ReactElement } from "react";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { Button } from "../../../components/Form/Button";
import { PasswordInput } from "../../../components/Form/PasswordInput";
import { NavigationProps } from "../../../interfaces";
import { FormContent, HeaderContent, SignUpContainer, SubTitle, Title } from "../styles";
import { alertError } from "../../../common/alertError";

export const SignUpSecondStep = ():ReactElement => {

    const navigation = useNavigation<NavigationProps>();
    const schema = yup.object().shape({
        password: yup
        .string()
        .min(9, 'A senha deve conter 9 caractéres')
        .required('Senha é obriatória'),

        cpassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Senhas diferentes')
        .required('Confirme a senha')
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
                        <Title>Falta pouco,{'\n'}agora é só mais{'\n'}um passo</Title>
                        <SubTitle>Adicione aqui sua Senha</SubTitle>
                    </HeaderContent>

                    <FormContent>
                        <PasswordInput 
                            name='password'
                            placeholder="Senha"
                            control={control}
                        />
                        <PasswordInput 
                            name='cpassword'
                            placeholder="Confirmar Senha"
                            control={control}
                        />
                        <Button 
                            title='Cadastrar'
                            onPress={handleSubmit(handleNextStep, alertError)}
                        />
                    </FormContent>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SignUpContainer>
    )
}