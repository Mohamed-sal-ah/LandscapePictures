import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { screenName, LoginScreenName } from "./routes";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import CategoryScreen from "../screens/CategoryScreen";
import UserScreen from "../screens/UserScreen";
import ExploreScreen from "../screens/ExploreScreen";
import AboutScreen from "../screens/AboutScreen";
import SearchResultScreen from "../screens/SearchResultScreen";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

type RouteProp = {
  route: any;
};

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screenName.HOME}
        component={HomeScreen}
        options={{ title: "Landscape Pictures" }}
      />
      <Stack.Screen
        name={screenName.SEARCH}
        component={SearchResultScreen}
        options={{ title: "Search Result" }}
      />
      <Stack.Screen
        name={screenName.ABOUT}
        component={AboutScreen}
        options={{ title: "About Us" }}
      />
      <Stack.Screen
        name={screenName.EXPLORE}
        component={ExploreScreen}
        options={{ title: "Explore" }}
      />
      <Stack.Screen
        name={screenName.USER}
        component={UserScreen}
        options={({ route }: RouteProp) => ({
          title: `${route.params.username} - Pictures`,
        })}
      />
      <Stack.Screen
        name={screenName.CATEGORY}
        component={CategoryScreen}
        options={({ route }: RouteProp) => ({ title: route.params.category })}
      />
      <Stack.Screen name={screenName.LOGIN_STACK} component={LoginStack} />
    </Stack.Navigator>
  );
}

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={screenName.LOGIN_STACK}
    >
      <Stack.Screen
        name={LoginScreenName.SIGN_IN}
        component={SignInScreen}
        options={{ title: "Sign in" }}
      />
      <Stack.Screen
        name={LoginScreenName.SIGN_UP}
        component={SignUpScreen}
        options={{ title: "Sign up" }}
      />
    </Stack.Navigator>
  );
};
