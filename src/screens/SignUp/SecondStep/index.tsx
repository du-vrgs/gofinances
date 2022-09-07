import React, { ReactElement, useState } from "react";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { Button } from "../../../components/Form/Button";
import { PasswordInput } from "../../../components/Form/PasswordInput";
import { NavigationProps } from "../../../interfaces";
import { FormContent, HeaderContent, SignUpContainer, SubTitle, Title } from "../styles";
import { alertError } from "../../../common/alertError";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RegisterUserProps extends FormData {
    password: string;
}
interface SignUpRouteProps {
    userData: {
        name: string;
        email: string;
    }
}

export const SignUpSecondStep = ():ReactElement => {

    const navigation = useNavigation<NavigationProps>();
    const route = useRoute();
    const { userData } = route.params as SignUpRouteProps;
    const [loadRequest, setLoadRequest] = useState(false);

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

    const handleRegister = async (formData: RegisterUserProps) => {

        setLoadRequest(true);
        try {
            const newUser = {
                name: userData.name,
                email: userData.email,
                password: formData.password,
            }
    
            await AsyncStorage.setItem(`@gofinances:user:${newUser.email}`, JSON.stringify(newUser))
            navigation.navigate('Dashboard')
        }
        catch {
            alertError('Erro ao criar sua conta, tente novamente! :)')
        }
        finally {
            setLoadRequest(false);
        }

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
                            onPress={handleSubmit(handleRegister, alertError)}
                            loading
                        />
                    </FormContent>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SignUpContainer>
    )
}