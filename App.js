import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./component/MyTabs";
import Entry from "./component/ScanEntry";
import Activities from "./component/ScanActivity";
import AccessConfirm from "./component/AccessConfirm";
import AccessDenied from "./component/AccessDenied";
import Event from "./pages/Event";
import CodeEvent from "./pages/CodeEvent";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator style={styles.container}>
        <Stack.Screen
          name="Saisie"
          component={CodeEvent}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Entry" component={Entry} />
        <Stack.Screen name="Activities" component={Activities} />
        <Stack.Screen name="Évènement" component={Event} />

        <Stack.Screen
          name="AccessConfirm"
          component={AccessConfirm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccessDenied"
          component={AccessDenied}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
