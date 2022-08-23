import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../providers/AuthContext";
import { AppRoutes } from "./app.routes";
import { AuthenticatedRoutes } from "./authenticated.routes";


export const Routes = () => {

    const { isUserSignOn } = useAuth();

    return (
        <NavigationContainer>
            {isUserSignOn ? <AuthenticatedRoutes /> : <AppRoutes />}
        </NavigationContainer>
    );
};