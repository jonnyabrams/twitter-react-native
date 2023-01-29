import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import RootNavigator from "./src/navigation/RootNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AuthContextProvider from "./src/context/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
          <StatusBar />
        </QueryClientProvider>
      </SafeAreaProvider>
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
