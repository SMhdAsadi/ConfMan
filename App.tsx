import { Navigation } from "@/navigation/navigation";
import "@/lib/unistyles";
import AuthContext from "@/contexts/AuthContext";
import useSetupSessionListener from "@/hooks/useSetupSessionListener";
import type { AuthSession } from "@supabase/supabase-js";
import { useMMKVObject } from "react-native-mmkv";
import { PaperProvider } from "react-native-paper";

function App() {
	useSetupSessionListener();
	const [session] = useMMKVObject<AuthSession>("session");
	const isLoggedIn = session !== null;

	return (
		<PaperProvider>
			<AuthContext.Provider value={isLoggedIn}>
				<Navigation />
			</AuthContext.Provider>
		</PaperProvider>
	);
}

export default App;
