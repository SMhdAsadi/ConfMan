import { useDefiniteColorScheme } from "@/utils/themeUtils";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const colorSchemeToPaperTheme = {
	light: MD3LightTheme,
	dark: MD3DarkTheme,
};
const colorSchemeToNavigationTheme = {
	light: DefaultTheme,
	dark: DarkTheme,
};

export function useThemes() {
	const colorScheme = useDefiniteColorScheme();

	const paperTheme = colorSchemeToPaperTheme[colorScheme];
	const navigationTheme = colorSchemeToNavigationTheme[colorScheme];

	return {
		paperTheme,
		navigationTheme,
	};
}
