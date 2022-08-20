import React from "react"
import { createStackNavigator } from "@react-navigation/stack";

import { SignIn } from "../screens/SignIn";
import { Splash } from "../screens/Splash";

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes = () => {

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen 
        name='splash'
        component={Splash}
      />
      <Screen 
        name='SignIn'
        component={SignIn}
      />
    </Navigator>
  )
}