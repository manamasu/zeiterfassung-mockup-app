import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        lazy: false,
        tabBarIcon: ({ color, size }) => {
          let icon: keyof typeof MaterialCommunityIcons.glyphMap;
          if (route.name === "overview") {
            icon = "view-list-outline";
          } else if (route.name === "time_planner") {
            icon = "calendar-clock";
          } else {
            icon = "help-circle";
          }
          return (
            <MaterialCommunityIcons name={icon} color={color} size={size} />
          );
        },
      })}
    >
      <Tabs.Screen name="time_planner" options={{ title: "Zeitplaner" }} />
      <Tabs.Screen name="overview" options={{ title: "Übersicht" }} />
    </Tabs>
  );
}
