import React from "react"
import { Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { MaterialIcons } from "@expo/vector-icons"
import { Dashboard } from "../screens/Dashboard"
import { Register } from "../screens/Register"
import theme from "../global/styles/theme"

const { Navigator, Screen } = createBottomTabNavigator()

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
          )
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
        name='Finances'
        component={Register}
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