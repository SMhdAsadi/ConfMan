import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function ConferenceListScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();

	return (
		<View style={styles.screen}>
			<Text>Conference List Screen</Text>
			<Button onPress={navigation.goBack}>Go Back</Button>
		</View>
	);
}

export default ConferenceListScreen;

const sheet = createStyleSheet({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
