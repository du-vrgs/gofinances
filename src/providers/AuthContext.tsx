import React, { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
    children: ReactNode;
};

interface IAuthtenticationResponse {
    params: {
        access_token: string;
    },
    type: string;
}

interface UserInfo {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    userInfo: UserInfo,
    signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext({} as IAuthContextData);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo)

    const signInWithGoogle = async () => {
        try {
            const CLIENT_ID = process.env;
            const REDIRECT_URI = process.env;
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { params, type } = await AuthSession.startAsync({ authUrl }) as IAuthtenticationResponse;

            if ( type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
                    headers: {
                        Authorization: `Bearer ${params.access_token}`
                    }
                })
                const userInfo = await response.json();

                setUserInfo({
                    name: userInfo.given_name,
                    email: userInfo.email,
                    id: userInfo.sub,
                    photo: userInfo.picture
                })
            }
        }
        catch (error) {
            throw new Error(error)
        }
    }

    const exportedValues = {
        userInfo,
        signInWithGoogle
    };

    return (
        <AuthContext.Provider value={exportedValues}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };