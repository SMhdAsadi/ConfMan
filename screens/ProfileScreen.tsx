import { useSignOutMutation } from "@/api/useSignOutMutation";
import { useUser } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useNavigation } from "@react-navigation/native";
import type { AuthError, AuthUser } from "@supabase/supabase-js";
import { useState } from "react";
import { View } from "react-native";
import { useMMKVObject } from "react-native-mmkv";
import {
	Appbar,
	Button,
	Dialog,
	Icon,
	Snackbar,
	Text,
} from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function ProfileScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();
	const user = useUser();
	const { error, isPending, mutate } = useSignOutMutation();

	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

	if (!user) return null;

	function logout() {
		hideDialog();
		mutate(undefined, {
			onError: () => setIsSnackbarVisible(true),
		});
	}

	function hideDialog() {
		setIsDialogVisible(false);
	}

	function hideSnackbar() {
		setIsSnackbarVisible(false);
	}

	return (
		<View style={styles.screen}>
			<Appbar.Header>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Profile" />
			</Appbar.Header>
			<View style={styles.content}>
				<Icon source="account" size={120} />
				<Text variant="bodyLarge">You are logged in as</Text>
				<Text>{user.email}</Text>
				<Button
					mode="text"
					onPress={() => setIsDialogVisible(true)}
					loading={isPending}
					disabled={isPending}
				>
					Logout
				</Button>
			</View>
			<Dialog visible={isDialogVisible} onDismiss={hideDialog}>
				<Dialog.Content>
					<Text variant="bodyMedium">Are you sure you want to sign out?</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={hideDialog}>Cancel</Button>
					<Button onPress={logout}>Ok</Button>
				</Dialog.Actions>
			</Dialog>

			<Snackbar
				visible={isSnackbarVisible}
				onDismiss={hideSnackbar}
				duration={4000}
				action={{
					label: "Close",
					onPress: hideSnackbar,
				}}
			>
				{error?.message}
			</Snackbar>
		</View>
	);
}

export default ProfileScreen;

const sheet = createStyleSheet(({ colors }) => ({
	screen: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
}));
