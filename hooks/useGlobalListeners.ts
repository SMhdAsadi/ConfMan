import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { Appearance } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export function useGlobalListeners() {
	useSetupRootBackgroundListener();
}

function useSetupRootBackgroundListener() {
	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			const schemeToBackgroundMap = {
				light: MD3LightTheme.colors.background,
				dark: MD3DarkTheme.colors.background,
			};
			const backgroundColor = schemeToBackgroundMap[colorScheme ?? "light"];

			SystemUI.setBackgroundColorAsync(backgroundColor);
		});

		return subscription.remove;
	}, []);
}
