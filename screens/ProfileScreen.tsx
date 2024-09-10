import { useSignOutMutation } from "@/api/useSignOutMutation";
import { useUser } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Appearance, View } from "react-native";
import {
	Appbar,
	Avatar,
	Button,
	Dialog,
	Divider,
	List,
	Modal,
	Portal,
	RadioButton,
	Snackbar,
	Surface,
	Text,
} from "react-native-paper";
import {
	UnistylesRuntime,
	createStyleSheet,
	useStyles,
} from "react-native-unistyles";

type ThemeOption = "light" | "dark" | "system";

function ProfileScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();
	const user = useUser();
	const { error, isPending, mutate } = useSignOutMutation();

	const [themeOption, setThemeOption] = useState<ThemeOption>("system");
	const [isThemeModalVisible, setIsThemeModalVisible] = useState(false);
	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [isErrorSnackbarVisible, setIsErrorSnackbarVisible] = useState(false);

	if (!user) return null;

	const showThemeModal = () => setIsThemeModalVisible(true);
	const hideThemeModal = () => setIsThemeModalVisible(false);
	const showDialog = () => setIsDialogVisible(true);
	const hideDialog = () => setIsDialogVisible(false);
	const showErrorSnackbar = () => setIsErrorSnackbarVisible(true);
	const hideErrorSnackbar = () => setIsErrorSnackbarVisible(false);

	function handleThemeChange(newTheme: ThemeOption) {
		setThemeOption(newTheme);
		hideThemeModal();

		Appearance.setColorScheme(newTheme === "system" ? null : newTheme);
		UnistylesRuntime.setTheme(newTheme === "system" ? "dark" : newTheme);
	}

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

			<View style={styles.header}>
				<Avatar.Image
					size={80}
					source={{
						uri: `https://ui-avatars.com/api/?background=BB86FC&color=fff&name=${user.email}`,
					}}
				/>
				<Text variant="bodyLarge">{user.email}</Text>
			</View>

			<List.Section>
				<List.Subheader>Appearance</List.Subheader>
				<List.Item
					title="Theme"
					description={
						themeOption.charAt(0).toUpperCase() + themeOption.slice(1)
					}
					onPress={showThemeModal}
					right={(props) => <List.Icon {...props} icon="chevron-right" />}
				/>
			</List.Section>

			<Divider />

			<List.Section>
				<List.Item
					title="App Version"
					description="0.0.1"
					left={(props) => <List.Icon {...props} icon="information" />}
				/>
			</List.Section>

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

				<Modal
					visible={isThemeModalVisible}
					onDismiss={hideThemeModal}
					contentContainerStyle={styles.modalContainer}
				>
					<Text variant="titleLarge">Choose Theme</Text>
					<RadioButton.Group
						onValueChange={(newValue) =>
							handleThemeChange(newValue as ThemeOption)
						}
						value={themeOption}
					>
						<RadioButton.Item label="Light" value="light" />
						<RadioButton.Item label="Dark" value="dark" />
						<RadioButton.Item label="System" value="system" />
					</RadioButton.Group>
					<Button onPress={hideThemeModal}>Close</Button>
				</Modal>
			</Portal>
		</Surface>
	);
}

export default ProfileScreen;

const sheet = createStyleSheet(({ colors }) => ({
	container: {
		flex: 1,
	},
	header: {
		alignItems: "center",
		marginVertical: 24,
		rowGap: 8,
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
