import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";

function HomeScreen() {
	const navigation = useNavigation();

	function onPress() {
		navigation.navigate("Details");
	}

	return (
		<View style={sheet.screen}>
			<Text>Home Screen</Text>
			<Button title="Go to Details" onPress={onPress} />
		</View>
	);
}

export default HomeScreen;

const sheet = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
