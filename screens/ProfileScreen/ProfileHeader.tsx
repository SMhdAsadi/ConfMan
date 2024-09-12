import { useUser } from "@/contexts/AuthContext";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const API_URL = "https://ui-avatars.com/api/";
const BACKGROUND_COLOR = "BB86FC";
const COLOR = "fff";

function getProfileImageUri(email: string) {
	return `${API_URL}?background=${BACKGROUND_COLOR}&color=${COLOR}&name=${email}`;
}

function ProfileHeader() {
	const { styles } = useStyles(stylesheet);
	const { email = "" } = useUser() ?? {};
	const uri = getProfileImageUri(email);

	return (
		<View style={styles.header}>
			<Avatar.Image size={80} source={{ uri }} />
			<Text variant="bodyLarge">{email}</Text>
		</View>
	);
}

export default ProfileHeader;

const stylesheet = createStyleSheet({
	header: {
		alignItems: "center",
		marginVertical: 24,
		rowGap: 8,
	},
});
