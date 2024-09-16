import { List } from "react-native-paper";

function ProfileAppVersionSection() {
	return (
		<List.Section>
			<List.Item
				title="App Version"
				description="0.8.0"
				left={(props) => <List.Icon {...props} icon="information" />}
			/>
		</List.Section>
	);
}

export default ProfileAppVersionSection;
