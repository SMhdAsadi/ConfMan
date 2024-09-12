import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from "react-native-paper";
import { UnistylesRegistry, UnistylesRuntime } from "react-native-unistyles";

const breakpoints = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
} as const;
type AppBreakpoints = typeof breakpoints;

type AppThemes = {
	light: MD3Theme;
	dark: MD3Theme;
};

declare module "react-native-unistyles" {
	export interface UnistylesBreakpoints extends AppBreakpoints {}
	export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addBreakpoints(breakpoints).addThemes({
	light: MD3LightTheme,
	dark: MD3DarkTheme,
});
