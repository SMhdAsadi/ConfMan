import { useUser } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useNavigation } from "@react-navigation/native";
import type { AuthError, AuthUser } from "@supabase/supabase-js";
import { useState } from "react";
import { View } from "react-native";
import { useMMKVObject } from "react-native-mmkv";
import { Appbar, Button, Dialog, Icon, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function ProfileScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();
	const user = useUser();
	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [, setError] = useState<AuthError | null>(null);

	if (!user) return null;

	function showDialog() {
		setIsDialogVisible(true);
	}

	function hideDialog() {
		setIsDialogVisible(false);
	}

	async function logout() {
		hideDialog();

		setLoading(true);
		setError(null);

		const { error } = await supabase.auth.signOut();

		setError(error);
		setLoading(false);
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
					onPress={showDialog}
					loading={loading}
					disabled={loading}
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
