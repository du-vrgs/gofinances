import React from "react"
import { createStackNavigator } from "@react-navigation/stack";

import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/FirstStep"
import { SignUpSecondStep } from "../screens/SignUp/SecondStep"

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
      <Screen 
        name='SignUpFirstStep'
        component={SignUpFirstStep}
      />
        <Screen 
        name='SignUpSecondStep'
        component={SignUpSecondStep}
      />
    </Navigator>
  )
}