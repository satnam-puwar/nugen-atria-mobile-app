import { Tabs } from "expo-router";
import {
  BarChart3,
  Building2,
  Home, // Keep import for when Dashboard is re-enabled
  Settings,
  Users,
  UtensilsCrossed,
} from "lucide-react-native";
import { cssInterop, useColorScheme } from "nativewind";

// Enable className styling for icons
// cssInterop(Home, {
//   className: { target: "style", nativeStyleToProp: { color: true } },
// });
cssInterop(Building2, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});
cssInterop(UtensilsCrossed, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});
cssInterop(Users, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});
cssInterop(BarChart3, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});
cssInterop(Settings, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#18181b" : "#ffffff",
          borderTopColor: isDark ? "#27272a" : "#e4e4e7",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: isDark ? "#6366f1" : "#4f46e5",
        tabBarInactiveTintColor: isDark ? "#71717a" : "#a1a1aa",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      {/* Dashboard tab - commented out for now */}
      {/* <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <Home
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="rooms"
        options={{
          title: "Rooms",
          tabBarIcon: ({ focused }) => (
            <Building2
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="food-services"
        options={{
          title: "Food",
          tabBarIcon: ({ focused }) => (
            <UtensilsCrossed
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ focused }) => (
            <Users
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          tabBarIcon: ({ focused }) => (
            <BarChart3
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <Settings
              className={focused ? "text-primary" : "text-muted-foreground"}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
