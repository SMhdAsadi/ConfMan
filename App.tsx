import "@/lib/unistyles";
import AuthContext from "@/contexts/AuthContext";
import { useGlobalListeners } from "@/hooks/useGlobalListeners";
import { useThemes } from "@/hooks/useThemes";
import { Navigation } from "@/navigation/navigation";
import type { AuthSession } from "@supabase/supabase-js";
import { useMMKVObject } from "react-native-mmkv";
import { PaperProvider } from "react-native-paper";

function App() {
	useGlobalListeners();
	const [session] = useMMKVObject<AuthSession>("session");
	const { navigationTheme, paperTheme } = useThemes();
	const isLoggedIn = session !== null;

	return (
		<PaperProvider theme={paperTheme}>
			<AuthContext.Provider value={isLoggedIn}>
				<Navigation theme={navigationTheme} />
			</AuthContext.Provider>
		</PaperProvider>
	);
}

export default App;
