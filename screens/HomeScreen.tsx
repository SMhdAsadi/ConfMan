import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function HomeScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();

	function onPress() {
		navigation.navigate("Details");
	}

	return (
		<View style={styles.screen}>
			<Text>Home Screen</Text>
			<Button title="Go to Details" onPress={onPress} />
		</View>
	);
}

export default HomeScreen;

const sheet = createStyleSheet({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
