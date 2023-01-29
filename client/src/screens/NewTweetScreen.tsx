import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  GestureResponderEvent,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "react-query";
import firebaseConfig from "../../firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import colours from "../constants/colours";
import ProfilePicture from "../components/ProfilePicture";
import { PostTweetType } from "../typings";
import { axiosCall } from "../axios";

initializeApp(firebaseConfig);

const NewTweetScreen = () => {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigation = useNavigation();

  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const pickImage = async () => {
    try {
      if (status?.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          // only allows images, use ...MediaTypeOptions.All to include videos
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          // between 0 and 1, choosing midway so don't deal with large uploads in server
          quality: 0.5,
        });

        if (!result.canceled) {
          setImagePreview(result.assets[0].uri);
          const storage = getStorage();
          const storageRef = ref(storage, `img${Date.now()}`);

          // convert img into array of bytes (blob)
          // for some reason fetch has to be passed result.assets etc not imageUrl
          const img = await fetch(result.assets[0].uri);
          const blob = await img.blob();
          await uploadBytes(storageRef, blob);
          await getDownloadURL(storageRef).then((url) => {
            setImageUrl(url);
          });

          // // Listen for state changes, errors, and completion of the upload.
          // uploadTask.on(
          //   "state_changed",
          //   (snapshot: any) => {
          //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          //     const progress =
          //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //     console.log("Upload is " + progress + "% done");
          //     switch (snapshot.state) {
          //       case "paused":
          //         console.log("Upload is paused");
          //         break;
          //       case "running":
          //         console.log("Upload is running");
          //         break;
          //     }
          //   },
          //   (error) => {
          //     // A full list of error codes is available at
          //     // https://firebase.google.com/docs/storage/web/handle-errors
          //     switch (error.code) {
          //       case "storage/unauthorized":
          //         console.log(
          //           "User doesn't have permission to access the object"
          //         );
          //         break;
          //       case "storage/canceled":
          //         console.log("User canceled the upload");
          //         break;
          //       case "storage/unknown":
          //         console.log(
          //           "Unknown error occurred, inspect error.serverResponse"
          //         );
          //         break;
          //     }
          //   },
          //   () => {
          //     // Upload completed successfully, now we can get the download URL
          //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //       setImageUrl(downloadURL);
          //     });
          //   }
          // );
        }
      } else {
        alert("You need to enable permissions to access library");
      }
    } catch (error) {
      console.log("Error reading an image");
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newTweet: PostTweetType) => {
      return axiosCall.post("/tweets", newTweet);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["tweets"]);
      },
    }
  );

  const handleSubmit = async (e: GestureResponderEvent) => {
    e.preventDefault();
    mutation.mutate({ content, img: imageUrl });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 20 }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.newTweetContainer}>
        <ProfilePicture image={require("../assets/lionel-hutz.jpeg")} />
        <View style={styles.inputsContainer}>
          <TextInput
            multiline
            numberOfLines={3}
            style={styles.tweetInput}
            placeholder="What's happening?"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setContent(text)}
            value={content}
          />
          {imagePreview && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imagePreview }} style={styles.image} />
              <AntDesign
                name="closecircle"
                size={25}
                style={styles.imageClose}
              />
            </View>
          )}
          <TouchableOpacity onPress={pickImage}>
            <Feather name="image" size={25} color={colours.light.tint} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewTweetScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colours.light.tint,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  image: {
    borderRadius: 10,
    width: 200,
    height: 150,
    marginBottom: 10,
  },
  imageClose: {
    color: "white",
    position: "absolute",
    top: 2,
    right: 2,
  },
  imageContainer: {
    position: "relative",
  },
  inputsContainer: {
    marginLeft: 10,
  },
  newTweetContainer: {
    flexDirection: "row",
    padding: 15,
  },
  pickImage: {
    fontSize: 18,
    color: colours.light.tint,
    marginVertical: 10,
  },
  tweetInput: {
    height: 100,
    // maxHeight: 300,
    fontSize: 20,
  },
});
