import { useUser } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Appbar, Divider, Surface } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ProfileAppVersionSection from "./ProfileAppVersionSection";
import ProfileAppearanceSection from "./ProfileAppearanceSection";
import ProfileHeader from "./ProfileHeader";
import ProfileLogoutButton from "./ProfileLogoutButton";

function ProfileScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();

	return (
		<Surface style={styles.container}>
			<View style={styles.content}>
				<ProfileHeader />
				<ProfileAppearanceSection />
				<Divider />
				<ProfileAppVersionSection />
				<ProfileLogoutButton />
			</View>
		</Surface>
	);
}

export default ProfileScreen;

const sheet = createStyleSheet((_, { insets }) => ({
	container: {
		flex: 1,
		paddingTop: insets.top,
	},
	content: {
		paddingHorizontal: 16,
	},
}));
