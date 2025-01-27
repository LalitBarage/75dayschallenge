import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ReportScreen from "./screens/ReportScreen";
import Toast from "react-native-toast-message";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        setIsLoggedIn(!!userToken); // Set login state based on token existence
      } catch (error) {
        console.error("Failed to fetch token from AsyncStorage", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginState();
  }, []);

  if (isLoading) {
    // Optionally show a loading spinner while checking login state
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Report"
          component={ReportScreen}
          options={{ headerShown: true }}
        />
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
