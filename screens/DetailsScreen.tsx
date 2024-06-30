import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
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
			<Button title="Back to home" onPress={onPress} />
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
