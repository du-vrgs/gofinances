import React, 
{
createContext, 
Dispatch,
ReactNode, 
SetStateAction,
useCallback, 
useContext, 
useEffect, 
useState 
} from "react";
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
    children: ReactNode;
};

interface IAuthtenticationResponse {
    params: {
        access_token: string;
    },
    type: string;
}

export interface UserInfoProps {
    id: string;
    name: string;
    email: string;
    photo?: string;
    password?: string;
}

interface IAuthContextData {
    setUserInfo: Dispatch<SetStateAction<UserInfoProps>>;
    userInfo: UserInfoProps,
    signInWithGoogle: () => Promise<void>;
    signInWithApple: () => Promise<void>;
    signOut(): Promise<void>;
    updateStorageUsers: (newUser: UserInfoProps) => Promise<void>;
    setStorageLastUserLogged: (userLogged: UserInfoProps) => Promise<void>;
    signOutLoading: boolean;
    storageTransactionsKey: string;
    storageUsersKey: string;
    isUserSignOn: boolean;
};

const AuthContext = createContext({} as IAuthContextData);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [loadingStorageUser, setLoadingStorageUser] = useState(true);
    const [signOutLoading, setSignOutLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfoProps>({} as UserInfoProps);
    const isUserSignOn = !!userInfo.id;
    const storageUsersKey = "@gofinances:users"
    const storageUserLoggedKey = "@gofinances:user_logged"
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

                await updateStorageUsers(user);
                await setStorageLastUserLogged(user);
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
                await updateStorageUsers(userInfos);
                await setStorageLastUserLogged(userInfos);
            }
        }
        catch (error) {
            throw new Error(error);
        };
    };
    const signOut = async () => {
        setSignOutLoading(true);

        await AsyncStorage.removeItem(storageUserLoggedKey).then(() => {
            setTimeout(() => {
                setUserInfo({} as UserInfoProps);
                setSignOutLoading(false);
            }, 1500)
        })
    };

    const setStorageLastUserLogged = useCallback(async (userLogged: UserInfoProps) => {
        await AsyncStorage.setItem(storageUserLoggedKey, JSON.stringify(userLogged));
    }, []);

    const updateStorageUsers = useCallback(async (newUser: UserInfoProps) => {
        const storageUsers = await AsyncStorage.getItem(storageUsersKey);
        const users: UserInfoProps[] = storageUsers ? JSON.parse(storageUsers) : [];
        users.unshift(newUser);
        
        await AsyncStorage.setItem(storageUsersKey, JSON.stringify(users));
    }, []);

    const getStorageLastUserLoggedData = useCallback(async() => {
        const userLoggedStorageData = await AsyncStorage.getItem(storageUserLoggedKey);
        
        if (userLoggedStorageData) {
            const lastUserLogged = JSON.parse(userLoggedStorageData) as UserInfoProps;

            setUserInfo(lastUserLogged);
        }

        setTimeout(() => setLoadingStorageUser(false), 2100);
    }, []);

    const exportedValues = {
        userInfo,
        setUserInfo,
        signInWithGoogle,
        signInWithApple,
        signOut,
        updateStorageUsers,
        setStorageLastUserLogged,
        signOutLoading,
        storageTransactionsKey,
        storageUsersKey,
        isUserSignOn,
    };

    useEffect(() => {getStorageLastUserLoggedData()}, [getStorageLastUserLoggedData]);

    return (
        <AuthContext.Provider value={exportedValues}>
            {/* {loadingStorageUser ? <Loading /> : children} */}
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };