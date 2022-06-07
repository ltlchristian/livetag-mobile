import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Event from "../pages/Event";
import CodeEvent from "../pages/CodeEvent";

const Tab = createBottomTabNavigator();

export default function MyTabs({ route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Saisie") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Évènement") {
            iconName = focused ? "barcode" : "barcode-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tab.Screen
        name="Saisie"
        component={CodeEvent}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Évènement"
        component={Event}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
