import { useSignOutMutation } from "@/api/useSignOutMutation";
import { useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Snackbar, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { toast } from "sonner-native";

function ProfileLogoutButton() {
	const { isPending, mutate } = useSignOutMutation();
	const { styles } = useStyles(stylesheet);

	const [isDialogVisible, setIsDialogVisible] = useState(false);

	const showDialog = () => setIsDialogVisible(true);
	const hideDialog = () => setIsDialogVisible(false);

	function logout() {
		hideDialog();
		mutate(undefined, {
			onSuccess() {
				toast.success("Logged out successfully. See you next time!", {
					closeButton: true,
				});
			},
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
