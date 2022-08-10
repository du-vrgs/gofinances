import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "../components/Loading";

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
    signInWithApple: () => Promise<void>;
};

const AuthContext = createContext({} as IAuthContextData);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [loadingStorageUser, setLoadingStorageUser] = useState(true);
    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);

    const signInWithGoogle = async () => {
        try {
            const CLIENT_ID = process.env.CLIENT_ID;
            const REDIRECT_URI = process.env.REDIRECT_URI;

            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { params, type } = await AuthSession.startAsync({ authUrl }) as IAuthtenticationResponse;

            if ( type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
                    headers: {
                        Authorization: `Bearer ${params.access_token}`
                    }
                });
                const userInfo = await response.json();
                const user = {
                    name: userInfo.given_name,
                    email: userInfo.email,
                    id: userInfo.sub,
                    photo: userInfo.picture
                };

                setUserInfo(user);
                await AsyncStorage.setItem("@gofinances:user", JSON.stringify(user));
            };
        }
        catch (error) {
            throw new Error(error);
        }
    };

    const signInWithApple = async () => {
        try {
            const response = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            if (response) {
                const user = {
                    name: response.fullName.givenName,
                    email: response.email,
                    id: String(response.user),
                    photo: null,
                };

                setUserInfo(user);
                await AsyncStorage.setItem("@gofinances:user", JSON.stringify(user));
            }
        }
        catch (error) {
            throw new Error(error);
        };
    };

    const getStorageUserData = useCallback(async() => {
        const userStorageData = await AsyncStorage.getItem("@gofinances:user");

        if (userStorageData) {
            const user = JSON.parse(userStorageData) as UserInfo;

            setUserInfo(user);
        }

        setTimeout(() => setLoadingStorageUser(false), 2100);
    }, []);

    const exportedValues = {
        userInfo,
        signInWithGoogle,
        signInWithApple
    };

    useEffect(() => {getStorageUserData()}, [getStorageUserData])

    return (
        <AuthContext.Provider value={exportedValues}>
            {loadingStorageUser ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };