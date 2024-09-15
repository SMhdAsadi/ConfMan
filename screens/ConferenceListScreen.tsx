import { useConferenceListQuery } from "@/api/useConferenceListQuery";
import type { Tables } from "@/database.types";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { Image } from "expo-image";
import { FlatList, RefreshControl, View } from "react-native";
import {
	Appbar,
	Button,
	Card,
	Paragraph,
	Surface,
	Text,
} from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

function ConferenceListScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();

	const { data, isFetching, refetch } = useConferenceListQuery();

	const renderConferenceItem = ({ item }: { item: Tables<"Conference"> }) => {
		const formattedStartDate = format(new Date(item.start_date * 1000), "PPP");
		const formattedEndDate = format(new Date(item.end_date * 1000), "PPP");

		function onViewProgramPress() {
			navigation.navigate("BottomTab", {
				screen: "HomeStack",
				params: {
					screen: "ProgramListScreen",
					params: {
						conferenceId: item.conference_id,
						title: item.name,
					},
				},
			});
		}

		function onViewParticipantsPress() {
			navigation.navigate("BottomTab", {
				screen: "HomeStack",
				params: {
					screen: "AttendanceListScreen",
					params: {
						conferenceId: item.conference_id,
						title: item.name,
					},
				},
			});
		}

		return (
			<Card style={styles.card}>
				<View style={styles.coverContainer}>
					<Image
						source={{ uri: item.image_url ?? "https://picsum.photos/700" }}
						style={styles.cover}
					/>
				</View>

				<Card.Content>
					<View style={styles.headerContainer}>
						<View style={styles.titleContainer}>
							<Text variant="headlineMedium">{item.name}</Text>
							<Text variant="labelMedium">{item.location}</Text>
						</View>
					</View>
					<Paragraph style={styles.description}>{item.description}</Paragraph>
					<Paragraph>
						{formattedStartDate} - {formattedEndDate}
					</Paragraph>
				</Card.Content>

				<Card.Actions>
					<Button onPress={onViewProgramPress}>View Programs</Button>
					<Button onPress={onViewParticipantsPress}>View Participants</Button>
				</Card.Actions>
			</Card>
		);
	};

	return (
		<Surface style={styles.screen}>
			<Appbar>
				<Appbar.Content title="Conferences" />
			</Appbar>
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

const sheet = createStyleSheet(({ roundness, colors }, { insets }) => ({
	screen: {
		flex: 1,
		paddingTop: insets.top,
	},
	listContainer: {
		padding: 16,
	},
	card: {
		backgroundColor: colors.surface,
		marginBottom: 16,
	},
	coverContainer: {
		height: 195,
		overflow: "hidden",
		borderRadius: roundness,
	},
	cover: {
		flex: 1,
		height: undefined,
		width: undefined,
		padding: 16,
		justifyContent: "flex-end",
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 8,
	},
	titleContainer: {
		flex: 1,
	},
	description: {
		marginBottom: 8,
	},
}));
