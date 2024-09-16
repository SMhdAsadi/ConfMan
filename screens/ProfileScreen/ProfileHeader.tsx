import Avatar from "@/components/Avatar";
import { useUser } from "@/contexts/AuthContext";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function ProfileHeader() {
	const { styles } = useStyles(stylesheet);
	const { email = "" } = useUser() ?? {};

	return (
		<View style={styles.header}>
			<Avatar firstName={email} lastName="" size={80} />
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
