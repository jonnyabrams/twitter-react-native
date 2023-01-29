import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colours from "../constants/colours";
import { useNavigation } from "@react-navigation/native";

const NewTweetButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={() => navigation.navigate("NewTweet" as never)}
    >
      <MaterialCommunityIcons name={"feather"} size={30} color="white" />
    </TouchableOpacity>
  );
};

export default NewTweetButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colours.light.tint,
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
