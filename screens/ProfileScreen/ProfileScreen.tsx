import { useSignOutMutation } from "@/api/useSignOutMutation";
import { useUser } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import {
	Appbar,
	Avatar,
	Button,
	Dialog,
	Divider,
	List,
	Portal,
	Snackbar,
	Surface,
	Text,
} from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ProfileAppVersionSection from "./ProfileAppVersionSection";
import ProfileAppearanceSection from "./ProfileAppearanceSection";
import ProfileHeader from "./ProfileHeader";

function ProfileScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();
	const user = useUser();
	const { error, isPending, mutate } = useSignOutMutation();

	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [isErrorSnackbarVisible, setIsErrorSnackbarVisible] = useState(false);

	if (!user) return null;

	const showDialog = () => setIsDialogVisible(true);
	const hideDialog = () => setIsDialogVisible(false);
	const showErrorSnackbar = () => setIsErrorSnackbarVisible(true);
	const hideErrorSnackbar = () => setIsErrorSnackbarVisible(false);

	function logout() {
		hideDialog();
		mutate(undefined, {
			onError: showErrorSnackbar,
		});
	}

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

			<View style={styles.buttonContainer}>
				<Button
					mode="contained"
					loading={isPending}
					onPress={showDialog}
					style={styles.button}
				>
					Log Out
				</Button>
			</View>

			<Portal>
				<Dialog visible={isDialogVisible} onDismiss={hideDialog}>
					<Dialog.Content>
						<Text variant="bodyMedium">Are you sure you want to logout?</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Cancel</Button>
						<Button onPress={logout}>Yes</Button>
					</Dialog.Actions>
				</Dialog>

				<Snackbar
					visible={isErrorSnackbarVisible}
					onDismiss={hideErrorSnackbar}
					duration={4000}
					action={{
						label: "Close",
						onPress: hideErrorSnackbar,
					}}
				>
					{error?.message}
				</Snackbar>
			</Portal>
		</Surface>
	);
}

export default ProfileScreen;

const sheet = createStyleSheet(({ colors }) => ({
	container: {
		flex: 1,
	},
	buttonContainer: {
		marginTop: 24,
	},
	button: {
		padding: 4,
	},
	modalContainer: {
		backgroundColor: colors.background,
		padding: 20,
		margin: 20,
		rowGap: 16,
		borderRadius: 8,
	},
}));
