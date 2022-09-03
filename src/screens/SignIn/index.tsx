import React, { ReactElement, useState } from "react";
import { Alert, Platform } from "react-native";

import { useAuth } from "../../providers/AuthContext";
import { 
    HeaderContent, 
    SignInContainer,
    Title,
    SubTitle,
    FooterContent,
    ButtonsWrapper
} from "./styles";

import { SocialSignInButton } from "../../components/SocialSignInButton";
import AppLogo from "../../assets/appLogo.svg";
import AppleLogo from "../../assets/appleLogo.svg";
import GoogleLogo from "../../assets/googleLogo.svg";
import { RegisterInput } from "../../components/Form/RegisterInput";
import { useForm } from "react-hook-form";

export const SignIn = (): ReactElement => {

    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const { signInWithGoogle, signInWithApple } = useAuth();
    const [load, setLoad] = useState(false);

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

    return (
        <SignInContainer>
            <HeaderContent>
                <AppLogo width={120} height={200} />
                <Title>
                    Controle suas
                    finanças de forma
                    muito simples
                </Title>
                <SubTitle>
                    Faça seu login com
                    uma das contas abaixo
                </SubTitle>
            </HeaderContent>

            <FooterContent>
                <ButtonsWrapper>
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
                    <RegisterInput
                        control={control}
                        name='email'
                        iconName='mail' 
                        keyboardType='email-address'
                    />
                </ButtonsWrapper>
            </FooterContent>
        </SignInContainer>
    );
};