import React, { ReactElement } from "react";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { useForm } from "react-hook-form";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Button } from "../../../components/Form/Button";
import { RegisterInput } from "../../../components/Form/RegisterInput";
import { FormContent, HeaderContent, SignUpContainer, SubTitle, Title } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../interfaces";

export const SignUpSecondStep = ():ReactElement => {

    const navigation = useNavigation<NavigationProps>();
    // const { control, handleSubmit } = useForm();

    // const handleNextStep = (formData: FormData) => {
    //     navigation.navigate('SignUpSecondStep', {
    //         userData: formData
    //     })
    // }

    return (
        <SignUpContainer>
        <KeyboardAvoidingView enabled behavior='position'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <HeaderContent>
                    <Title>Crie sua conta{'\n'}de forma{'\n'}simples e rápida</Title>
                    <SubTitle>Adicione aqui seu Nome e E-mail</SubTitle>
                </HeaderContent>

                <FormContent>
                    {/* <RegisterInput 
                        iconName='user'
                        control={control}
                        name='name'
                    />
                    <RegisterInput 
                        iconName="mail"
                        control={control}
                        name='email'
                        keyboardType='email-address'
                    /> */}
                    <Button 
                        title='Próximo'
                        // onPress={() => handleSubmit(handleNextStep)}
                    />
                </FormContent>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SignUpContainer>
    )
}