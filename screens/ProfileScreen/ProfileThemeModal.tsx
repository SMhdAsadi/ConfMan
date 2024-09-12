import {
	type AppTheme,
	updateAppTheme,
	useAppTheme,
	useDefiniteColorScheme,
} from "@/utils/themeUtils";
import { useColorScheme } from "react-native";
import { Button, Modal, Portal, RadioButton, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type ProfileThemeModalProps = {
	isVisible: boolean;
	onDismiss: () => void;
};

function ProfileThemeModal(props: ProfileThemeModalProps) {
	const appTheme = useAppTheme();
	const { isVisible, onDismiss } = props;
	const { styles } = useStyles(stylesheet);

	function onValueChange(appTheme: string) {
		updateAppTheme(appTheme as AppTheme);
		onDismiss();
	}

	return (
		<Portal>
			<Modal
				visible={isVisible}
				onDismiss={onDismiss}
				contentContainerStyle={styles.container}
			>
				<Text variant="titleLarge">Choose Theme</Text>
				<RadioButton.Group onValueChange={onValueChange} value={appTheme}>
					<RadioButton.Item label="Light" value="light" />
					<RadioButton.Item label="Dark" value="dark" />
					<RadioButton.Item label="System" value="system" />
				</RadioButton.Group>
				<Button onPress={onDismiss}>Close</Button>
			</Modal>
		</Portal>
	);
}

export default ProfileThemeModal;

const stylesheet = createStyleSheet(({ colors }) => ({
	container: {
		backgroundColor: colors.background,
		padding: 20,
		margin: 20,
		rowGap: 16,
		borderRadius: 8,
	},
}));
