import { supabase } from "@/lib/supabase";
import { storage } from "@/state/storage";
import type { AuthError } from "@supabase/supabase-js";
import { useState } from "react";
import { View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function LoginScreen() {
	const { styles } = useStyles(sheet);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<AuthError | null>(null);
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const textInputIcon = isPasswordHidden ? "eye-off" : "eye";

	async function login() {
		setError(null);
		setLoading(true);

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		setError(error);

		if (error === null) {
			storage.set("user", JSON.stringify(data.user));
		}

		setLoading(false);
	}

	return (
		<View style={styles.screen}>
			<View style={styles.header}>
				<Text variant="headlineLarge">ConfMan</Text>
				<Text variant="titleLarge">Login to your account</Text>
			</View>

			<View style={styles.content}>
				<TextInput
					mode="outlined"
					label="Email"
					value={email}
					onChangeText={setEmail}
					left={<TextInput.Icon icon="email" />}
					style={styles.email}
				/>
				<TextInput
					mode="outlined"
					label="Password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={isPasswordHidden}
					left={<TextInput.Icon icon="shield" />}
					right={
						<TextInput.Icon
							icon={textInputIcon}
							onPress={() => setIsPasswordHidden((v) => !v)}
						/>
					}
				/>
				<HelperText type="error" visible={error !== null}>
					{error?.message}
				</HelperText>
			</View>

			<Button mode="contained" onPress={login} loading={loading}>
				Login
			</Button>
		</View>
	);
}

export default LoginScreen;

const sheet = createStyleSheet(({ colors }) => ({
	screen: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 24,
	},
	header: {
		marginBottom: 16,
	},
	content: {
		marginBottom: 36,
	},
	email: {
		marginBottom: 12,
	},
}));
