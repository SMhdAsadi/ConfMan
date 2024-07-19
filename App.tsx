import { Navigation } from "@/navigation/navigation";
import "@/theme/unistyles";
import { PaperProvider } from "react-native-paper";

function App() {
	return (
		<PaperProvider>
			<Navigation />
		</PaperProvider>
	);
}

export default App;
