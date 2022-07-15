import React from 'react'
import { ReactElement } from "react";
import { Input } from '../../components/Form/Input';
import { 
    RegisterContainer as Container,
    Header,
    Title
} from "./styles";

export const Register = ():ReactElement => {

    return (
        <Container>
            <Header>
                <Title>
                    Cadastro
                </Title>
            </Header>

            <Input 
                placeholder='Nome'
            />

        </Container>
    )
}