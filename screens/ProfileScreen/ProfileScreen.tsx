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
	const user = useUser();

	if (!user) return null;

	return (
		<Surface style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Profile" />
			</Appbar.Header>

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

const sheet = createStyleSheet(({ colors }) => ({
	container: {
		flex: 1,
	},
	content: {
		paddingHorizontal: 16,
	},
}));
