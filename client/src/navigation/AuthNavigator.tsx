import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { AuthNavigatorParamList } from "../typings";

const AuthNavigatorStack = createNativeStackNavigator<AuthNavigatorParamList>();

const AuthNavigator = () => {
  return (
    <AuthNavigatorStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthNavigatorStack.Screen name="Login" component={LoginScreen} />
      <AuthNavigatorStack.Screen name="Register" component={RegisterScreen} />
    </AuthNavigatorStack.Navigator>
  );
};

export default AuthNavigator;
