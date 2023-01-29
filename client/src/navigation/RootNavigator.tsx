import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigator from "./BottomTabNavigator";
import NewTweetScreen from "../screens/NewTweetScreen";
import { RootStackParamList } from "../typings";
import AuthNavigator from "./AuthNavigator";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {currentUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen name="NewTweet" component={NewTweetScreen} />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
