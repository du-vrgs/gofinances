import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { SocialSignInButtonContainer, SvgContent, Title } from "./styles";

interface Props extends RectButtonProps {
    title: string;
    svg: React.FC<SvgProps>;
    loading?: boolean;
}

export const SocialSignInButton = ({
    title,
    svg: Svg,
    loading,
    ...rest
}: Props) => {

    return (
        <SocialSignInButtonContainer {...rest} enabled={!loading}>
            {loading 
            ? <ActivityIndicator style={{flex: 1, justifyContent: 'center'}}/> 
            : <>
                <SvgContent>
                    <Svg />
                </SvgContent>
                <Title>{title}</Title>
            </>}
        </SocialSignInButtonContainer>
    )
}