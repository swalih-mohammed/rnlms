import { registerRootComponent } from "expo";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { HomeStackScreen } from "./src/Navigation/homeNavigator";
// import { AuthStackScreen } from "./src/Navigation/homeNavigator";
import { store, persistor } from "./src/store/index";
import { PersistGate } from "redux-persist/integration/react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/Components/course/list";
import CourseDetail from "./src/Components/course/detail";
import UnitDetail from "./src/Components/unit/detail";
import LessonDetail from "./src/Components/lessons/detail";
import PhotoLessonList from "./src/Components/lessons/photoLessonList";
import Account from "./src/Screens/AccountScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import SignUp from "./src/Screens/SignUpScreen";
import Getstarted from "./src/Screens/getStarted";
import TestScreen from "./src/Screens/TestScreen";

// import LoginScreen from "./src/Screens/Login";
// import TestDetail from "./src/Components/pacticeTest/list";
import TestDetail from "./src/Components/quiz/list";

const Stack = createStackNavigator();

// const Tabs = createBottomTabNavigator();
const Tabs = createMaterialBottomTabNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: "red",
    red: "red",
    yellow: "#3498db",
    green: "#f1c40f",
    primary: "#aacc00",
    secondary: "#414757",
    error: "#f13a59",
    // text: "#ffffff",
    background: "#333333",
    white: "#FFFFFF",
    offWhite: "#F8F0E3"
  }
};

export const TabScreens = () => (
  <Tabs.Navigator
    initialRouteName="Home"
    activeColor="#184e77"
    inactiveColor="#168aad"
    barStyle={{ backgroundColor: "#aacc00" }}
  >
    <Tabs.Screen
      name="Home"
      options={{
        // tabBarColor: "#aacc00",
        tabBarIcon: "home"
      }}
      component={HomeScreen}
    />
    <Tabs.Screen
      name="Account"
      options={{
        headerShown: false,
        tabBarIcon: "account"
      }}
      component={Account}
    />
  </Tabs.Navigator>
);

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={MyTheme}>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator>
                {/* <Stack.Screen name="TestScreen" component={TestScreen} /> */}
                <Stack.Screen name="Courses" component={TabScreens} />
                <Stack.Screen name="Course Details" component={CourseDetail} />
                <Stack.Screen name="Unit Details" component={UnitDetail} />
                <Stack.Screen
                  name="Lesson Details"
                  options={{
                    headerShown: false
                  }}
                  component={LessonDetail}
                />
                <Stack.Screen
                  name="Photo Lesson List"
                  component={PhotoLessonList}
                />
                <Stack.Screen
                  options={{
                    headerShown: false
                  }}
                  name="Lesson Test"
                  component={TestDetail}
                />
                <Stack.Screen
                  options={{
                    headerShown: false
                  }}
                  name="SignUp"
                  component={SignUp}
                />
                <Stack.Screen
                  options={{
                    headerShown: false
                  }}
                  name="Login"
                  component={LoginScreen}
                />
                <Stack.Screen
                  options={{
                    headerShown: false
                  }}
                  name="Getstarted"
                  component={Getstarted}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
