import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function HomeScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();

	function goToConferenceList() {
		navigation.navigate("BottomTab", {
			screen: "HomeStack",
			params: {
				screen: "ConferenceListScreen",
			},
		});
	}

	function goToProfile() {
		navigation.navigate("BottomTab", {
			screen: "ProfileScreen",
		});
	}

	return (
		<View style={styles.screen}>
			<View style={styles.content}>
				<Text variant="titleLarge" style={styles.title}>
					Welcome!
				</Text>
				<View style={styles.buttonContainer}>
					<Button mode="contained-tonal" onPress={goToConferenceList}>
						conferences
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

const sheet = createStyleSheet((_, { insets }) => ({
	screen: {
		flex: 1,
		justifyContent: "center",
		paddingTop: insets.top,
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
}));
