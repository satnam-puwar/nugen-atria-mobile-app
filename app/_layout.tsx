import { ThemeProvider } from "@/components/ThemeProvider";
import "@/global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  console.log("RootLayout rendered");

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="room-details" />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

