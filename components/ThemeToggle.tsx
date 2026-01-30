import { Moon, Sun } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      onPress={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}
    >
      {colorScheme === "dark" ? (
        // In dark mode show a white sun icon
        <Sun size={24} color="#ffffff" />
      ) : (
        // In light mode show a dark moon icon
        <Moon size={24} color="#020617" />
      )}
    </TouchableOpacity>
  );
}
