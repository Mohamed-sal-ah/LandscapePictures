import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import NotFoundScreen from '../screens/NotFoundScreen';
import { screenName, OnAuthScreenName, LoginScreenName } from './routes'
import LinkingConfiguration from './LinkingConfiguration';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CategoryScreen from '../screens/CategoryScreen';
import AccountScreen from '../screens/AccountScreen';
import UserScreen from '../screens/UserScreen';
import ExploreScreen from '../screens/ExploreScreen';
import AboutScreen from '../screens/AboutScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import UploadScreen from '../screens/UploadScreen/UploadScreen';
import UpdateUserInfoScreen from '../screens/UpdateUserInfoScreen';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

type RouteProp = {
  route: any
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={screenName.HOME} component={HomeScreen} options={{ title: 'Landscape Pictures' }} />
      <Stack.Screen name={screenName.SEARCH} component={SearchResultScreen} options={{ title: 'Search Result' }} />
      <Stack.Screen name={screenName.ABOUT} component={AboutScreen} options={{ title: 'About Us' }} />
      <Stack.Screen name={screenName.EXPLORE} component={ExploreScreen} options={{ title: 'Explore' }} />
      <Stack.Screen name={screenName.USER} component={UserScreen} options={({ route }: RouteProp) => ({ title: `${route.params.username} - Pictures` })} />
      <Stack.Screen name={screenName.CATEGORY} component={CategoryScreen} options={({ route }: RouteProp) => ({ title: route.params.category })} />
      <Stack.Screen name={screenName.LOGIN_STACK} component={LoginStack} />
      <Stack.Screen name={screenName.USER_STACK} component={OnAuthStack} />
    </Stack.Navigator>
  );
}


const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={screenName.LOGIN_STACK}
    >
      <Stack.Screen name={LoginScreenName.SIGN_IN} component={SignInScreen} options={{ title: 'Sign in' }} />
      <Stack.Screen name={LoginScreenName.SIGN_UP} component={SignUpScreen} options={{ title: 'Sign up' }} />
    </Stack.Navigator>
  )
}

const OnAuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={OnAuthScreenName.ACCOUNT} component={AccountScreen} options={{ title: 'Account' }} />
      <Stack.Screen name={OnAuthScreenName.UPDATE_USER_INFO} component={UpdateUserInfoScreen} options={{ title: 'Update User Info' }} />
      <Stack.Screen name={OnAuthScreenName.UPLOAD} component={UploadScreen} options={{ title: 'Upload' }} />
    </Stack.Navigator>
  )
}