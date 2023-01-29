import {
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import axios from "axios";

import colours from "../constants/colours";
import { useState } from "react";

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const RegisterScreen = ({ navigation }: IProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const handleSubmit = async (e: GestureResponderEvent) => {
    e.preventDefault();

    setEmailIsValid(true);
    setPasswordsMatch(true);
    setPasswordIsValid(true);

    if (validEmailRegex.test(email) === false) {
      setEmailIsValid(false);
    } else if (password !== confirmPassword) {
      setPasswordsMatch(false);
    } else if (password.length < 3) {
      setPasswordIsValid(false);
    } else {
      const newUser = {
        username,
        email,
        password,
      };
      try {
        await axios.post("http://localhost:8000/api/users/register", newUser);
        navigation.navigate("Login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <Ionicons
            name="logo-twitter"
            size={50}
            color={colours.light.tint}
            style={styles.logo}
          />
        </View>
        <View style={styles.inputContainer}>
          <Feather
            style={styles.inputIcon}
            name="twitter"
            size={20}
            color={colours.light.tint}
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
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
            autoCorrect={false}
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
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
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
            autoCorrect={false}
            placeholder="Confirm password"
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        {!emailIsValid && (
          <Text style={{ color: "red", fontSize: 14 }}>
            * Invalid email format
          </Text>
        )}
        {!passwordsMatch && (
          <Text style={{ color: "red", fontSize: 14 }}>
            * Passwords do not match
          </Text>
        )}
        {!passwordIsValid && (
          <Text style={{ color: "red", fontSize: 14 }}>
            * Password must be at least 3 characters
          </Text>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16 }}>
          Already signed up?{" "}
          <Text
            style={{ color: "white" }}
            onPress={() => navigation.navigate("Login")}
          >
            Log in now
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: "center",
    backgroundColor: colours.light.tint,
    height: "24%",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: colours.light.tint,
    borderColor: "white",
    borderRadius: 50,
    borderWidth: 2,
    height: 70,
    justifyContent: "center",
    marginVertical: 40,
    width: 350,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: colours.light.tint,
    borderRadius: 50,
    borderWidth: 2,
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
    backgroundColor: "white",
    borderColor: colours.light.tint,
    borderRadius: 100,
    borderWidth: 2,
    height: 100,
    justifyContent: "center",
    marginBottom: 50,
    marginTop: 100,
    width: 100,
  },
  topContainer: {
    alignItems: "center",
    height: "76%",
  },
});
