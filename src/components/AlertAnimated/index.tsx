import React, { ReactElement } from "react";
import { AlertAnimatedContainer } from "./styles";

import LottieView from 'lottie-react-native';
import lottieAlert from "../../assets/lottieAlert.json";

export const AlertAnimated = (): ReactElement => {

    return (
        <AlertAnimatedContainer>
            <LottieView 
                source={lottieAlert}
                style={{ height: 180 }}
                resizeMode="contain"
                autoPlay
                loop={false}
            />
        </AlertAnimatedContainer>
    )
}