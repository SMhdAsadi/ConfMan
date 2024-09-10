import "./lib/unistyles";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useGlobalListeners } from "./hooks/useGlobalListeners";
import { useThemes } from "./hooks/useThemes";
import { Navigation } from "./lib/navigation";

SplashScreen.preventAutoHideAsync();

function App() {
	useGlobalListeners();

	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}

function AppContent() {
	const { isLoading } = useAuth();
	const { navigationTheme, paperTheme } = useThemes();

	if (isLoading) return null;

	return (
		<PaperProvider theme={paperTheme}>
			<Navigation theme={navigationTheme} onReady={SplashScreen.hideAsync} />
		</PaperProvider>
	);
}

export default App;
