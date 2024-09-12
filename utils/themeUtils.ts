import { Appearance, type ColorSchemeName, useColorScheme } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";

export type AppTheme = "dark" | "light" | "system";

export function getDefiniteColorScheme(appColorScheme: ColorSchemeName) {
	if (appColorScheme === "light" || appColorScheme === "dark") {
		return appColorScheme;
	}

	const deviceColorScheme = UnistylesRuntime.colorScheme;
	if (deviceColorScheme === "unspecified") {
		return "light";
	}
	return deviceColorScheme;
}

export function useDefiniteColorScheme() {
	const appColorScheme = useColorScheme();
	return getDefiniteColorScheme(appColorScheme);
}

export function useAppTheme(): AppTheme {
	const colorScheme = useColorScheme();

	return colorScheme ?? "system";
}

export function updateAppTheme(newTheme: AppTheme) {
	const newColorScheme = newTheme === "system" ? null : newTheme;
	Appearance.setColorScheme(newColorScheme);
}
