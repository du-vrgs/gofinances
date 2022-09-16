import React, { ReactElement, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { useForm } from "react-hook-form";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { useAuth } from "../../providers/AuthContext";
import { 
    HeaderContent, 
    SignInContainer,
    Title,
    SubTitle,
    FooterContent,
    FormWrapper,
    LoginTypeButton,
    LoginTypeButtonText,
    SingInButtonsWrapper
} from "./styles";
import { useTheme } from "styled-components";
import { NavigationProps } from "../../interfaces";

import { SocialSignInButton } from "../../components/SocialSignInButton";
import AppLogo from "../../assets/appLogo.svg";
import AppleLogo from "../../assets/appleLogo.svg";
import GoogleLogo from "../../assets/googleLogo.svg";
import { RegisterInput } from "../../components/Form/RegisterInput";
import { Button } from "../../components/Form/Button";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SignInProps {
    email: string;
    password: string;
}

export const SignIn = (): ReactElement => {

    const { storageUserKey, setUserInfo } = useAuth();
    const navigation = useNavigation<NavigationProps>();
    const theme = useTheme();
    const schema = yup.object().shape({
        email: yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
        password: yup.string().min(9, 'A senha deve conter 9 caractéres').required('Senha é obrigatória')
    })
    
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const { signInWithGoogle, signInWithApple } = useAuth();
    const [load, setLoad] = useState(false);
    const [loginWithEmail, setLoginWithEmail] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const handleSignInWithGoogle = async () => {
        setLoad(true);
        try {
            await signInWithGoogle();
        }
        catch (error) {
            console.log('[screens][SignIn][handleSignInWithGoogle][ERROR]', error);
            Alert.alert('Não foi possível conectar com a conta Google');
        }
    };
    const handleSigInWithApple = async () => {
        try {
            await signInWithApple();
        }
        catch (error) {
            console.log('[screens][SignIn][handleSigInWithApple][ERROR]', error);
            Alert.alert('Não foi possível conectar com a conta Apple');
        }
    };
    const handleSignInWithEmail = async (formData: FormData) => {
        try {
            const { email, password } = formData as unknown as SignInProps
            const user = await AsyncStorage.getItem(`${storageUserKey}${email}`)
            if (!user) {
                return Alert.alert(
                    'Ops!', 
                    'E-mail não cadastrado', 
                    [
                        {
                            text: 'Cadastrar', 
                            onPress: () => handleNavigateToSignUp()
                        },
                        {
                            text: 'Tentar novamente', 
                            onPress: () => null
                        }
                    ])
            }
            const userData = JSON.parse(user)
            if (password !== userData.password) {
                return Alert.alert(
                    'Ops!', 
                    'Senha inválida', 
                    [
                        {
                            text: 'Tentar novamente', 
                            onPress: () => null
                        }
                    ])
            }

            setUserInfo({
                id: userData.id,
                name: userData.name,
                email: userData.email,
            })
        }
        catch {
            AlertError('Deu algo errado por aqui, tente novamente :)')
        }
    }
    const AlertError = (error) => {
        Alert.alert('Ops', String(Object.values(error)[0]['message']))
    }
    const handleNavigateToSignUp = () => navigation.navigate('SignUpFirstStep');

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true); // or some other action
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false); // or some other action
          }
        );
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);

    return (
        <SignInContainer>
            {/* <KeyboardAvoidingView behavior="position" enabled> */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <HeaderContent keyboardVisible={keyboardVisible}>
                    <AppLogo width={120} height={190} />
                    {!keyboardVisible &&
                    <>
                        <Title>
                            Controle suas
                            finanças de forma
                            muito simples
                        </Title>
                        <SubTitle>
                            Faça seu login com
                            uma das contas abaixo
                        </SubTitle>
                    </>
                    }
                </HeaderContent>

                <FooterContent keyboardVisible={keyboardVisible}>
                    <FormWrapper>
                        {loginWithEmail ?
                        <>
                            <RegisterInput
                                control={control}
                                name='email'
                                iconName='mail' 
                                keyboardType='email-address'
                            />
                            <RegisterInput
                                control={control}
                                name='password'
                                iconName='lock' 
                                keyboardType='visible-password'
                            />
                            <SingInButtonsWrapper>
                                <Button 
                                    title="Nova conta"
                                    onPress={() => handleNavigateToSignUp()}
                                    bgColor={`${theme.colors.primary}90`}
                                    size='fifty'
                                />
                                <Button 
                                    title="Entrar"
                                    onPress={handleSubmit(handleSignInWithEmail, AlertError)}
                                    bgColor={theme.colors.primary}
                                    size='fifty'
                                />
                            </SingInButtonsWrapper>
                        </>
                        :
                        <>
                        <SocialSignInButton
                            onPress={handleSignInWithGoogle}
                            title="Entrar com Google" 
                            svg={GoogleLogo}
                            loading={load}
                        />
                        {Platform.OS === 'ios' && 
                            <SocialSignInButton
                                onPress={handleSigInWithApple}
                                title="Entrar com Apple" 
                                svg={AppleLogo}
                                loading={load}
                            />
                        }
                        </>
                        }

                        <LoginTypeButton 
                            onPress={() => setLoginWithEmail(!loginWithEmail)}
                        >
                            <LoginTypeButtonText>
                                {loginWithEmail ? "Entrar com Conta Social": "Entrar com Email e Senha"}
                            </LoginTypeButtonText>
                        </LoginTypeButton>
                    </FormWrapper>
                </FooterContent>
            </TouchableWithoutFeedback>
            {/* </KeyboardAvoidingView> */}
        </SignInContainer>
    );
};