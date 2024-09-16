import { Avatar as PaperAvatar } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
	firstName: string;
	lastName: string;
	size?: number;
};

function Avatar(props: Props) {
	const { firstName, lastName, size = 48 } = props;
	const { styles } = useStyles(stylesheet);

	function getLabel() {
		if (lastName.length === 0) {
			return firstName.slice(0, 2).toUpperCase();
		}

		return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
	}

	return (
		<PaperAvatar.Text size={size} label={getLabel()} style={styles.avatar} />
	);
}

export default Avatar;

const stylesheet = createStyleSheet(({ colors }) => ({
	avatar: {
		backgroundColor: colors.primary,
	},
}));
