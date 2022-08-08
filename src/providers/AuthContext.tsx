import React, { createContext, ReactNode, useContext } from "react";
import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
    children: ReactNode;
};

interface IAuthContextData {
    user: {
        id: string;
        name: string;
        email: string;
        photo?: string;
    },
    signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext({} as IAuthContextData);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {

    const user = {
        id: 'random',
        name: 'Eduardo',
        email: 'email',
        photo: 'photoURL'
    };

    const signInWithGoogle = async () => {
        try {
            const CLIENT_ID = '448986409309-htsaa7b9epju3lkbvsqg2q1bcr1jndkm.apps.googleusercontent.com';
            const REDIRECT_ID = 'https://auth.expo.io/@eddvrgs/gofinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_ID}&RESPONSE_TYPE=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const response = await AuthSession.startAsync({ authUrl });
            console.log(response)
            // return response
        }
        catch (error) {
            throw new Error(error)
        }
    }

    const exportedValues = {
        user,
        signInWithGoogle
    };

    return (
        <AuthContext.Provider value={exportedValues}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };