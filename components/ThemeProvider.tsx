// ThemeProvider.tsx
import { useColorScheme } from "nativewind";
import { View } from "react-native";
import { darkTheme, lightTheme } from "../theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { colorScheme } = useColorScheme();

  const themeVars = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <View
      // Fallback inline style so content is visible even if NativeWind is misconfigured
      style={[themeVars, { flex: 1, backgroundColor: "#ffffff" }]}
      className={`${colorScheme} flex-1 bg-background`}
    >
      {children}
    </View>
  );
}
