import { useAttendanceListQuery } from "@/api/useAttendanceListQuery";
import Avatar from "@/components/Avatar";
import type { Tables } from "@/database.types";
import {
	type StaticScreenProps,
	useNavigation,
} from "@react-navigation/native";
import { FlatList, RefreshControl, View } from "react-native";
import { Appbar, Card, Surface, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = StaticScreenProps<{
	conferenceId: number;
	title: string;
}>;

function AttendanceListScreen(props: Props) {
	const { conferenceId, title } = props.route.params;
	const { styles } = useStyles(stylesheet);

	const navigation = useNavigation();
	const { data, isFetching, refetch } = useAttendanceListQuery({
		conferenceId,
	});

	const renderParticipantItem = ({ item }: { item: Tables<"Participant"> }) => (
		<Card style={styles.card} mode="elevated">
			<View style={styles.container}>
				<Avatar firstName={item.first_name} lastName={item.last_name} />
				<View style={styles.details}>
					<Text variant="titleMedium" style={styles.name}>
						{item.first_name} {item.last_name}
					</Text>
					<Text variant="bodyMedium" style={styles.email}>
						{item.email}
					</Text>
					{item.organization && (
						<Text variant="bodySmall" style={styles.organization}>
							{item.organization}
						</Text>
					)}
					{item.phone_number && (
						<Text variant="bodySmall" style={styles.phone}>
							{item.phone_number}
						</Text>
					)}
				</View>
			</View>
		</Card>
	);

	return (
		<Surface style={styles.screen}>
			<Appbar>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title={title} />
			</Appbar>

			<FlatList
				data={data}
				renderItem={renderParticipantItem}
				refreshControl={
					<RefreshControl refreshing={isFetching} onRefresh={refetch} />
				}
				keyExtractor={(item) => item.participant_id.toString()}
				contentContainerStyle={styles.listContainer}
			/>
		</Surface>
	);
}

export default AttendanceListScreen;

const stylesheet = createStyleSheet(({ colors }, { insets }) => ({
	screen: {
		flex: 1,
		paddingTop: insets.top,
	},
	listContainer: {
		padding: 16,
	},
	card: {
		marginBottom: 16,
		backgroundColor: colors.surface,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	details: {
		flex: 1,
		marginLeft: 16,
	},
	name: {
		fontWeight: "bold",
		marginBottom: 4,
		color: colors.onSurface,
	},
	email: {
		color: colors.onSurface,
	},
	organization: {
		color: colors.secondary,
		marginTop: 4,
	},
	icon: {
		marginLeft: 8,
	},
	phone: {
		color: colors.secondary,
		marginTop: 4,
	},
}));
