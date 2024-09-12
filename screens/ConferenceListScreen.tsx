import { useConferenceListQuery } from "@/api/useConferenceListQuery";
import type { Tables } from "@/database.types";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { FlatList, RefreshControl, View } from "react-native";
import {
	Appbar,
	Avatar,
	Button,
	Card,
	Paragraph,
	Surface,
	Text,
	Title,
} from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Conference = Tables<"Conference">;

function ConferenceListScreen() {
	const { styles, theme } = useStyles(sheet);
	const navigation = useNavigation();

	const { data, error, isFetching, refetch } = useConferenceListQuery();

	const renderConferenceItem = ({ item }: { item: Conference }) => {
		const formattedStartDate = format(new Date(item.start_date * 1000), "PPP");
		const formattedEndDate = format(new Date(item.end_date * 1000), "PPP");

		return (
			<Card style={styles.card} elevation={2}>
				<Card.Content>
					<View style={styles.headerContainer}>
						<Avatar.Icon
							size={48}
							icon="calendar-month"
							style={{ backgroundColor: theme.colors.primary }}
						/>
						<View style={styles.titleContainer}>
							<Title>{item.name}</Title>
							<Paragraph>{item.location}</Paragraph>
						</View>
					</View>
					<Paragraph style={styles.description}>{item.description}</Paragraph>
					<View style={styles.dateContainer}>
						<Paragraph>From: {formattedStartDate}</Paragraph>
						<Paragraph>To: {formattedEndDate}</Paragraph>
					</View>
				</Card.Content>

				<Card.Actions>
					<Button>View Programs</Button>
					<Button>View Participants</Button>
				</Card.Actions>
			</Card>
		);
	};

	return (
		<Surface style={styles.screen}>
			<Appbar.Header>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Conferences" />
			</Appbar.Header>

			<FlatList
				data={data}
				renderItem={renderConferenceItem}
				refreshControl={
					<RefreshControl refreshing={isFetching} onRefresh={refetch} />
				}
				keyExtractor={(item) => item.conference_id.toString()}
				contentContainerStyle={styles.listContainer}
			/>
		</Surface>
	);
}

export default ConferenceListScreen;

const sheet = createStyleSheet((_, { insets }) => ({
	screen: {
		flex: 1,
		paddingBottom: insets.bottom,
	},
	listContainer: {
		padding: 16,
	},
	card: {
		marginBottom: 16,
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	titleContainer: {
		marginLeft: 16,
		flex: 1,
	},
	description: {
		marginBottom: 8,
	},
	dateContainer: {
		marginTop: 8,
	},
}));
