import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function DetailsScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();

	function onPress() {
		navigation.goBack();
	}

	return (
		<View style={styles.screen}>
			<Text>Details Screen</Text>
			<Button onPress={onPress}>Back to home</Button>
		</View>
	);
}

export default DetailsScreen;

const sheet = createStyleSheet({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
