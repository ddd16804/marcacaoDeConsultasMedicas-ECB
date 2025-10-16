import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components/native';
import theme from '../styles/theme';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { View, Text } from 'react-native';

const AppointmentScreen: React.FC = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Appointment Screen (placeholder)</Text>
  </View>
);

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer
        theme={{
          colors: {
            background: theme.colors.background,
            primary: theme.colors.primary,
            text: theme.colors.textPrimary,
            card: theme.colors.secondary,
            border: theme.colors.border,
            notification: theme.colors.error,
          },
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.secondary,
            headerTitleStyle: {
              fontFamily: theme.fonts.bold,
              fontSize: 20,
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'HealthStop - Entrar' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'HealthStop' }}
          />
          <Stack.Screen
            name="Appointment"
            component={AppointmentScreen}
            options={{ title: 'Marcar Consulta' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
