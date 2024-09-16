import { useSignInMutation } from "@/api/useSignInMutation";
import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Avatar, Button, Surface, Text, TextInput } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { toast } from "sonner-native";

function LoginScreen() {
	const { styles } = useStyles(sheet);
	const { isPending, mutate } = useSignInMutation();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const textInputIcon = isPasswordHidden ? "eye-off" : "eye";

	function login() {
		mutate(
			{ email, password },
			{
				onSuccess({ user }) {
					toast.success(`Welcome ${user.email}!`, {
						closeButton: true,
					});
				},
			},
		);
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<Surface style={styles.surface} elevation={4}>
				<Avatar.Image
					size={80}
					source={require("@/assets/icon.png")}
					style={styles.appIcon}
				/>
				<Text variant="headlineMedium" style={styles.title}>
					Welcome Back
				</Text>
				<Text variant="titleMedium" style={styles.subtitle}>
					Sign in to continue
				</Text>

				<TextInput
					label="Email"
					value={email}
					onChangeText={setEmail}
					style={styles.input}
					mode="outlined"
					keyboardType="email-address"
					autoCapitalize="none"
					left={<TextInput.Icon icon="email" />}
				/>
				<TextInput
					label="Password"
					value={password}
					onChangeText={setPassword}
					style={styles.input}
					mode="outlined"
					secureTextEntry={isPasswordHidden}
					left={<TextInput.Icon icon="shield" />}
					right={
						<TextInput.Icon
							icon={textInputIcon}
							onPress={() => setIsPasswordHidden((v) => !v)}
						/>
					}
				/>

				<Button
					mode="contained"
					onPress={login}
					icon="login"
					contentStyle={styles.button}
					loading={isPending}
					labelStyle={styles.buttonText}
				>
					Login
				</Button>
			</Surface>
		</KeyboardAvoidingView>
	);
}

export default LoginScreen;

const sheet = createStyleSheet(() => ({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 24,
	},
	surface: {
		padding: 20,
		borderRadius: 24,
	},
	appIcon: {
		alignSelf: "center",
		marginBottom: 20,
	},
	title: {
		marginBottom: 8,
		textAlign: "center",
	},
	subtitle: {
		marginBottom: 20,
		textAlign: "center",
		opacity: 0.7,
	},
	input: {
		marginBottom: 16,
	},
	button: {
		paddingVertical: 8,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	linksContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 16,
	},
}));
