import { useUser } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
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

			<ProfileHeader />
			<ProfileAppearanceSection />
			<Divider />
			<ProfileAppVersionSection />
			<ProfileLogoutButton />
		</Surface>
	);
}

export default ProfileScreen;

const sheet = createStyleSheet(({ colors }) => ({
	container: {
		flex: 1,
	},
	modalContainer: {
		backgroundColor: colors.background,
		padding: 20,
		margin: 20,
		rowGap: 16,
		borderRadius: 8,
	},
}));
