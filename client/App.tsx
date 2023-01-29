import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "react-native-toast-notifications";

import RootNavigator from "./src/navigation/RootNavigator";
import AuthContextProvider from "./src/context/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <ToastProvider placement="top" offset={50} duration={3000} successColor="#4D9FEC">
          <QueryClientProvider client={queryClient}>
            <RootNavigator />
            <StatusBar />
          </QueryClientProvider>
        </ToastProvider>
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
