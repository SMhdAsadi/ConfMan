import { toTitleCase } from "@/utils/textUtils";
import { useAppTheme } from "@/utils/themeUtils";
import { useState } from "react";
import { List } from "react-native-paper";
import ProfileThemeModal from "./ProfileThemeModal";

function ProfileAppearanceSection() {
	const appTheme = useAppTheme();
	const description = toTitleCase(appTheme);

	const [isThemeModalVisible, setIsThemeModalVisible] = useState(false);

	const showThemeModal = () => setIsThemeModalVisible(true);
	const hideThemeModal = () => setIsThemeModalVisible(false);

	return (
		<>
			<List.Section>
				<List.Subheader>Appearance</List.Subheader>
				<List.Item
					title="Theme"
					description={description}
					onPress={showThemeModal}
					right={(props) => <List.Icon {...props} icon="chevron-right" />}
				/>
			</List.Section>
			<ProfileThemeModal
				isVisible={isThemeModalVisible}
				onDismiss={hideThemeModal}
			/>
		</>
	);
}

export default ProfileAppearanceSection;
