import "@/lib/unistyles";
import AuthContext from "@/contexts/AuthContext";
import { useGlobalListeners } from "@/hooks/useGlobalListeners";
import { Navigation } from "@/navigation/navigation";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import type { AuthSession } from "@supabase/supabase-js";
import { useColorScheme } from "react-native";
import { useMMKVObject } from "react-native-mmkv";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

function App() {
	useGlobalListeners();
	const [session] = useMMKVObject<AuthSession>("session");
	const isLoggedIn = session !== null;
	const colorScheme = useColorScheme() ?? "light";
	const paperTheme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;
	const navigationTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

	return (
		<PaperProvider theme={paperTheme}>
			<AuthContext.Provider value={isLoggedIn}>
				<Navigation theme={navigationTheme} />
			</AuthContext.Provider>
		</PaperProvider>
	);
}

export default App;
