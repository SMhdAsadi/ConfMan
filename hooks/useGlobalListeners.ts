import { getDefiniteColorScheme } from "@/utils/themeUtils";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { Appearance } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { UnistylesRuntime, useInitialTheme } from "react-native-unistyles";

export function useGlobalListeners() {
	useSetupColorSchemeListener();
	useSetupUnistylesInitialTheme();
}

const colorSchemeToBackgroundMap = {
	light: MD3LightTheme.colors.background,
	dark: MD3DarkTheme.colors.background,
};

function useSetupColorSchemeListener() {
	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			const definiteColorScheme = getDefiniteColorScheme(colorScheme);
			const backgroundColor = colorSchemeToBackgroundMap[definiteColorScheme];

			SystemUI.setBackgroundColorAsync(backgroundColor);
			UnistylesRuntime.setTheme(definiteColorScheme);
		});

		return subscription.remove;
	}, []);
}

function useSetupUnistylesInitialTheme() {
	const initialTheme = getDefiniteColorScheme(Appearance.getColorScheme());
	useInitialTheme(initialTheme);
}
