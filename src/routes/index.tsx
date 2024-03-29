import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../providers/AuthContext";
import { AppRoutes } from "./app.routes";
import { AuthenticatedRoutes } from "./authenticated.routes";


export const Routes = () => {

    const { userInfo } = useAuth();

    return (
        <NavigationContainer>
            {userInfo.id ? <AuthenticatedRoutes /> : <AppRoutes />}
        </NavigationContainer>
    );
};