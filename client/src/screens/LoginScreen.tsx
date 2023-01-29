import {
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useState } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";

import colours from "../constants/colours";
import { AuthContext } from "../context/AuthContext";

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const LoginScreen = ({ navigation }: IProps) => {
  const { login, currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: GestureResponderEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <Ionicons
            name="logo-twitter"
            size={50}
            color="white"
            style={styles.logo}
          />
        </View>
        <View style={styles.inputContainer}>
          <Feather
            style={styles.inputIcon}
            name="mail"
            size={20}
            color={colours.light.tint}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome
            style={styles.inputIcon}
            name="user-circle-o"
            size={20}
            color={colours.light.tint}
          />
          <TextInput
            secureTextEntry
            textContentType="password"
            style={styles.input}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Text style={{ color: "white" }}>Forgot password?</Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleLogin}>
            Log In
          </Text>
        </TouchableOpacity>
        <Text>
          New to Twitter?{" "}
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{ color: colours.light.tint }}
          >
            Sign up now
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: "center",
    height: "27%",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: colours.light.tint,
    borderRadius: 50,
    borderWidth: 2,
    height: 70,
    justifyContent: "center",
    marginVertical: 40,
    width: 350,
  },
  buttonText: {
    color: colours.light.tint,
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    flexDirection: "row",
    height: 70,
    justifyContent: "center",
    marginBottom: 20,
    width: 350,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  inputIcon: {
    padding: 20,
  },
  logo: {},
  logoContainer: {
    alignItems: "center",
    backgroundColor: colours.light.tint,
    borderColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    height: 100,
    justifyContent: "center",
    marginVertical: 100,
    width: 100,
  },
  topContainer: {
    alignItems: "center",
    backgroundColor: colours.light.tint,
    height: "73%",
  },
});
