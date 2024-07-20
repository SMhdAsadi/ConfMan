import { View } from "react-native";
import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function LoginScreen() {
	const { styles } = useStyles(sheet);

	return (
		<View style={styles.screen}>
			<Text>Login Screen</Text>
		</View>
	);
}

export default LoginScreen;

const sheet = createStyleSheet({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
