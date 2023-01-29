import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import { TweetType } from "../typings";

export type TweetFooterProps = {
  tweet: TweetType;
};

const TweetFooter = ({ tweet }: TweetFooterProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name={"message-circle"} size={20} color={"grey"} />
        <Text style={styles.number}>{tweet.numberOfComments}</Text>
      </View>
      <View style={styles.iconContainer}>
        <EvilIcons name={"retweet"} size={28} color={"grey"} />
        <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign
            name="hearto"
            size={20}
            color="grey"
          />
        </TouchableOpacity>
        <Text style={styles.number}>20</Text>
      </View>
      <View style={styles.iconContainer}>
        <EvilIcons name={"share-google"} size={28} color={"grey"} />
      </View>
    </View>
  );
};

export default TweetFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    marginLeft: 5,
    color: "grey",
    textAlign: "center",
  },
});
