import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { Feather } from "@expo/vector-icons";

import ProfilePicture from "./ProfilePicture";
import { TweetType } from "../typings";
import TweetFooter from "./TweetFooter";

export type MainContainerProps = {
  tweet: TweetType;
};

const Tweet = ({ tweet }: MainContainerProps) => {
  return (
    <View style={styles.tweet}>
      <ProfilePicture image={require("../assets/lionel-hutz.jpeg")} />
      <View style={styles.container}>
        <View style={styles.tweetHeaderContainer}>
          <View style={styles.tweetHeaderNames}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text style={styles.username}>@{tweet.user.username}</Text>
            <Text style={styles.createdAt}>
              {moment(tweet.createdAt).fromNow()}
            </Text>
          </View>
          <Feather name={"more-horizontal"} size={16} color={"grey"} />
        </View>
        <View>
          <Text style={styles.content}>{tweet.content}</Text>
        </View>
        <TweetFooter tweet={tweet} />
      </View>
    </View>
  );
};

export default Tweet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  content: {
    marginTop: 5,
    lineHeight: 18,
  },
  createdAt: {
    marginRight: 5,
    color: "grey",
  },
  image: {
    marginVertical: 10,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 15,
    overflow: "hidden",
  },
  name: {
    marginRight: 5,
    fontWeight: "bold",
  },
  tweet: {
    width: "100%",
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: "lightgrey",
  },
  tweetHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tweetHeaderNames: {
    flexDirection: "row",
  },
  username: {
    marginRight: 5,
    color: "grey",
  },
});
