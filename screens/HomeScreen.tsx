import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function HomeScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();

	function goToConferenceList() {
		navigation.navigate("ConferenceList");
	}

	function goToProfile() {
		navigation.navigate("Profile");
	}

	return (
		<View style={styles.screen}>
			<Appbar.Header>
				<Appbar.Content title="Home" />
			</Appbar.Header>
			<View style={styles.content}>
				<Text variant="titleLarge" style={styles.title}>
					Welcome!
				</Text>
				<View style={styles.buttonContainer}>
					<Button mode="contained-tonal" onPress={goToConferenceList}>
						conference list
					</Button>
					<Button mode="contained-tonal" onPress={goToProfile}>
						profile
					</Button>
				</View>
			</View>
		</View>
	);
}

export default HomeScreen;

const sheet = createStyleSheet({
	screen: {
		flex: 1,
		justifyContent: "center",
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		marginBottom: 16,
	},
	buttonContainer: {
		flexDirection: "row",
		columnGap: 12,
	},
});
