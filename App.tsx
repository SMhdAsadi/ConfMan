import "./lib/unistyles";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./contexts/AuthContext";
import { useGlobalListeners } from "./hooks/useGlobalListeners";
import { useThemes } from "./hooks/useThemes";
import { Navigation } from "./lib/navigation";

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
