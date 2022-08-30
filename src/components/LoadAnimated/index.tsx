import React, { ReactElement } from "react";
import { LoadAnimatedContainer } from "./styles";

import LottieView from 'lottie-react-native';
import lottieLoad from "../../assets/lottieLoad.json";

export const LoadAnimated = ():ReactElement => {

    return (
        <LoadAnimatedContainer>
            <LottieView
                source={lottieLoad}
                style={{ height: 180 }}
                resizeMode="contain"
                loop
                autoPlay
            />
        </LoadAnimatedContainer>
    )
}