import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
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
			<Button onPress={onPress}>Go to details</Button>
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
