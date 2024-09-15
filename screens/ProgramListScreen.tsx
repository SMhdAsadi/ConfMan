import { useProgramListQuery } from "@/api/useProgramListQuery";
import type { Tables } from "@/database.types";
import {
	type StaticScreenProps,
	useNavigation,
} from "@react-navigation/native";
import { format } from "date-fns";
import { faIR } from "date-fns/locale";
import { FlatList, RefreshControl, View } from "react-native";
import {
	Appbar,
	Card,
	Paragraph,
	Surface,
	Text,
	Title,
} from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = StaticScreenProps<{
	conferenceId: number;
	title: string;
}>;

function ProgramListScreen(props: Props) {
	const { conferenceId, title } = props.route.params;
	const { styles } = useStyles(stylesheet);

	const navigation = useNavigation();
	const { data, isFetching, refetch } = useProgramListQuery({ conferenceId });

	const renderProgramItem = ({ item }: { item: Tables<"Program"> }) => {
		const startDate = new Date(item.start_date * 1000);
		const endDate = new Date(item.end_date * 1000);
		const pattern = "PPP hh:mm aaa";
		const formattedStartDate = format(startDate, pattern);
		const formattedEndDate = format(endDate, pattern);

		return (
			<Card style={styles.card}>
				<Card.Content>
					<Title>{item.name}</Title>
					<Paragraph>{item.description}</Paragraph>
					<Paragraph>Location: {item.location}</Paragraph>
					<View style={styles.dateContainer}>
						<Paragraph>From: {formattedStartDate}</Paragraph>
						<Paragraph>To: {formattedEndDate}</Paragraph>
					</View>
				</Card.Content>
			</Card>
		);
	};

	return (
		<Surface style={styles.screen}>
			<Appbar>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title={title} />
			</Appbar>

			<FlatList
				data={data}
				renderItem={renderProgramItem}
				refreshControl={
					<RefreshControl refreshing={isFetching} onRefresh={refetch} />
				}
				keyExtractor={(item) => item.program_id.toString()}
				contentContainerStyle={styles.listContainer}
			/>
		</Surface>
	);
}

export default ProgramListScreen;

const stylesheet = createStyleSheet((_, { insets }) => ({
	screen: {
		flex: 1,
		paddingTop: insets.top,
	},
	listContainer: {
		padding: 16,
	},
	card: {
		marginBottom: 16,
	},
	dateContainer: {
		marginTop: 8,
	},
}));
