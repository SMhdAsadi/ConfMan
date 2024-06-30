import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";

function DetailsScreen() {
	const navigation = useNavigation();

	function onPress() {
		navigation.goBack();
	}

	return (
		<View style={sheet.screen}>
			<Text>Details Screen</Text>
			<Button title="Back to home" onPress={onPress} />
		</View>
	);
}

export default DetailsScreen;

const sheet = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
