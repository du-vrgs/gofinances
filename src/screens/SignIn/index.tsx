import React, { ReactElement } from "react";
import { 
    HeaderContent, 
    SignInContainer,
    Title,
    SubTitle,
    FooterContent,
    ButtonsWrapper
} from "./styles";

import AppLogo from "../../assets/appLogo.svg";
import AppleLogo from "../../assets/appleLogo.svg";
import GoogleLogo from "../../assets/googleLogo.svg";

import { SocialSignInButton } from "../../components/SocialSignInButton";

export const SignIn = (): ReactElement => {

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
                    <SocialSignInButton title="Entrar com Google" svg={GoogleLogo}/>
                    <SocialSignInButton title="Entrar com Apple" svg={AppleLogo}/>
                </ButtonsWrapper>
            </FooterContent>
        </SignInContainer>
    )
}