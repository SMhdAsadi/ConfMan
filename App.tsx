import { Navigation } from "@/navigation/navigation";
import "@/lib/unistyles";
import AuthContext from "@/contexts/AuthContext";
import useSetupSessionListener from "@/hooks/useSetupSessionListener";
import type { AuthSession } from "@supabase/supabase-js";
import { Appearance, useColorScheme } from "react-native";
import { useMMKVObject } from "react-native-mmkv";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

function App() {
	useSetupSessionListener();
	const [session] = useMMKVObject<AuthSession>("session");
	const isLoggedIn = session !== null;
	const colorScheme = useColorScheme() ?? "light";
	const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

	return (
		<PaperProvider theme={theme}>
			<AuthContext.Provider value={isLoggedIn}>
				<Navigation />
			</AuthContext.Provider>
		</PaperProvider>
	);
}

export default App;
