import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { SocialSignInButtonContainer, SvgContent, Title } from "./styles";

interface Props extends RectButtonProps {
    title: string;
    svg: React.FC<SvgProps>;
}

export const SocialSignInButton = ({
    title,
    svg: Svg,
    ...rest
}: Props) => {

    return (
        <SocialSignInButtonContainer {...rest}>
            <SvgContent>
                <Svg />
            </SvgContent>
            <Title>{title}</Title>
        </SocialSignInButtonContainer>
    )
}