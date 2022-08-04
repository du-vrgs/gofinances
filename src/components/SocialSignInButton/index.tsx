import React, { ReactElement } from "react";
import { SvgProps } from "react-native-svg";
import { SocialSignInButtonContainer, SvgContent, Title } from "./styles";

interface Props {
    title: string;
    svg: React.FC<SvgProps>;
}

export const SocialSignInButton = ({
    title,
    svg: Svg
}: Props): ReactElement => {

    return (
        <SocialSignInButtonContainer>
            <SvgContent>
                <Svg />
            </SvgContent>
            <Title>{title}</Title>
        </SocialSignInButtonContainer>
    )
}