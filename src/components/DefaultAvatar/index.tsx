import React, {ReactElement} from 'react';
import { AvatarBody, AvatarHead, BodyCut, DefaultAvatarContainer } from './styles';

export const DefaultAvatar = (): ReactElement => {

    return (
        <DefaultAvatarContainer>
            <AvatarHead />
            <AvatarBody />
            <BodyCut />
        </DefaultAvatarContainer>
    );
};