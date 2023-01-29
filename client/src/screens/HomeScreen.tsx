import { View, StyleSheet } from "react-native";

import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Feed />
      <NewTweetButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
