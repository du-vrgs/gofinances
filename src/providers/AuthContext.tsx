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
    signOut(): Promise<void>;
    signOutLoading: boolean;
    storageTransactionsKey: string;
    isUserSignOn: boolean;
};

const AuthContext = createContext({} as IAuthContextData);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [loadingStorageUser, setLoadingStorageUser] = useState(true);
    const [signOutLoading, setSignOutLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
    const isUserSignOn = !!userInfo.id;
    const storageUserKey = "@gofinances:user"
    const storageTransactionsKey = `@gofinances:transaction:${userInfo.id}`

    const signInWithGoogle = async () => {
        try {
            const CLIENT_ID = process.env.CLIENT_ID;
            const REDIRECT_URI = process.env.REDIRECT_URI;

            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { params, type } = await AuthSession.startAsync({ authUrl }) as IAuthtenticationResponse;

            if ( type === 'success') {
                setSignOutLoading(true);
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
                setSignOutLoading(false);

                await AsyncStorage.setItem(storageUserKey, JSON.stringify(user));
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

                const { fullName, email, user } = response

                const userInfos = {
                    name: fullName.givenName,
                    email: email,
                    id: String(user),
                    photo: `https://ui-avatars.com/api/?name=${fullName.givenName}&length=2`,
                };

                setUserInfo(userInfos);
                await AsyncStorage.setItem(storageUserKey, JSON.stringify(userInfos));
            }
        }
        catch (error) {
            throw new Error(error);
        };
    };
    const signOut = async () => {
        setSignOutLoading(true);
        await AsyncStorage.removeItem(storageUserKey).then(res => {
            setUserInfo({} as UserInfo);
            setSignOutLoading(false);
        });
    }

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
        signInWithApple,
        signOut,
        signOutLoading,
        storageTransactionsKey,
        isUserSignOn,
    };

    useEffect(() => {getStorageUserData()}, [getStorageUserData])

    return (
        <AuthContext.Provider value={exportedValues}>
            {/* {loadingStorageUser ? <Loading /> : children} */}
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };