import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { HomeNavigatorParamList } from "../typings";
import HomeScreen from "../screens/HomeScreen";
import colours from "../constants/colours";
import ProfilePicture from "../components/ProfilePicture";
import { AuthContext } from "../context/AuthContext";

const HomeNavigatorStack = createNativeStackNavigator<HomeNavigatorParamList>();

const HomeNavigator = () => {
  const { logout } = useContext(AuthContext);

  return (
    <HomeNavigatorStack.Navigator>
      <HomeNavigatorStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <Ionicons
              name={"logo-twitter"}
              size={30}
              color={colours.light.tint}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name={"star-four-points-outline"}
              size={30}
              color={colours.light.tint}
              style={{ marginRight: 15 }}
              onPress={() => logout()}
            />
          ),
          headerLeft: () => (
            <ProfilePicture
              size={40}
              image={require("../assets/lionel-hutz.jpeg")}
              style={{ marginLeft: 15, marginBottom: 10 }}
            />
          ),
        }}
      />
    </HomeNavigatorStack.Navigator>
  );
};

export default HomeNavigator;
