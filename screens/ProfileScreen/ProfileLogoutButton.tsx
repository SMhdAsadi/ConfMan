import { useSignOutMutation } from "@/api/useSignOutMutation";
import { useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Snackbar, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function ProfileLogoutButton() {
	const { error, isPending, mutate } = useSignOutMutation();
	const { styles } = useStyles(stylesheet);

	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [isErrorSnackbarVisible, setIsErrorSnackbarVisible] = useState(false);

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
		<View style={styles.buttonContainer}>
			<Button
				mode="contained"
				loading={isPending}
				onPress={showDialog}
				style={styles.button}
			>
				Log Out
			</Button>

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
			</Portal>

			<Portal>
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
		</View>
	);
}

export default ProfileLogoutButton;

const stylesheet = createStyleSheet({
	buttonContainer: {
		marginTop: 24,
	},
	button: {
		padding: 4,
	},
});
