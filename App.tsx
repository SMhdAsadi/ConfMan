import "@/lib/unistyles";
import { useGlobalListeners } from "@/hooks/useGlobalListeners";
import { useThemes } from "@/hooks/useThemes";
import { Navigation } from "@/navigation/navigation";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
	useGlobalListeners();
	const { navigationTheme, paperTheme } = useThemes();

	return (
		<PaperProvider theme={paperTheme}>
			<AuthProvider>
				<Navigation theme={navigationTheme} />
			</AuthProvider>
		</PaperProvider>
	);
}

export default App;
