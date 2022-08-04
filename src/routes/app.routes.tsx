import React from "react"
import { Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import theme from "../global/styles/theme"
import { MaterialIcons } from "@expo/vector-icons"
import { Dashboard } from "../screens/Dashboard"
import { Register } from "../screens/Register"
import { Resume } from "../screens/Resume"

const { Navigator, Screen } = createBottomTabNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export const AppRoutes = () => {

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88
        }
      }}
    >
      <Screen 
        name='Listagem'
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons 
              color={color}
              size={size}
              name='format-list-bulleted'
            />
          ),
        }}
      />

      <Screen 
        name='Registro'
        component={Register}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons 
              color={color}
              size={size}
              name='attach-money'
            />
          )
        }}
      />

      <Screen 
        name='Resumo'
        component={Resume}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons 
              color={color}
              size={size}
              name='pie-chart'
            />
          )
        }}
      />

    </Navigator>
  )
}