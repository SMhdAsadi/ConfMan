import "./lib/unistyles";
import { QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Toaster } from "sonner-native";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useGlobalListeners } from "./hooks/useGlobalListeners";
import { useThemes } from "./hooks/useThemes";
import { Navigation } from "./lib/navigation";
import { queryClient } from "./lib/queryClient";

SplashScreen.preventAutoHideAsync();

function App() {
	useGlobalListeners();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<AuthProvider>
					<QueryClientProvider client={queryClient}>
						<AppContent />
					</QueryClientProvider>
				</AuthProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}

function AppContent() {
	const { isLoading } = useAuth();
	const { navigationTheme, paperTheme } = useThemes();
	const insets = useSafeAreaInsets();

	if (isLoading) return null;

	return (
		<PaperProvider theme={paperTheme}>
			<Navigation theme={navigationTheme} onReady={SplashScreen.hideAsync} />
			<Toaster offset={insets.top + 16} />
		</PaperProvider>
	);
}

export default App;
