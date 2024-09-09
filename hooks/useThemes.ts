import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export function useThemes() {
	const colorScheme = useColorScheme() ?? "light";
	const paperTheme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
	const navigationTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

	return {
		paperTheme,
		navigationTheme,
	};
}
