import { useProgramListQuery } from "@/api/useProgramListQuery";
import type { Tables } from "@/database.types";
import {
	type StaticScreenProps,
	useNavigation,
} from "@react-navigation/native";
import { format } from "date-fns";
import { FlatList, RefreshControl, View } from "react-native";
import { Appbar, Card, Icon, Surface, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = StaticScreenProps<{
	conferenceId: number;
	title: string;
}>;

function ProgramListScreen(props: Props) {
	const { conferenceId, title } = props.route.params;
	const { styles, theme } = useStyles(stylesheet);

	const navigation = useNavigation();
	const { data, isFetching, refetch } = useProgramListQuery({ conferenceId });

	const renderProgramItem = ({ item }: { item: Tables<"Program"> }) => {
		const startDate = new Date(item.start_date * 1000);
		const endDate = new Date(item.end_date * 1000);
		const pattern = "hh:mmaaa";
		const formattedStartDate = format(startDate, pattern);
		const formattedEndDate = format(endDate, pattern);

		return (
			<Card style={styles.card} contentStyle={styles.cardContent}>
				<View style={styles.timeline}>
					<View style={styles.dot} />
					<View style={styles.line} />
					<View style={styles.dot} />
				</View>

				<View style={styles.details}>
					<Text variant="titleMedium" style={styles.mainText}>
						{item.name}
					</Text>

					{item.description && (
						<Text variant="bodyMedium" style={styles.mainText}>
							{item.description}
						</Text>
					)}

					{item.location && (
						<View style={styles.metaContainer}>
							<Icon
								source="map-marker-outline"
								size={16}
								color={theme.colors.primary}
							/>
							<Text variant="bodySmall" style={styles.metaText}>
								{item.location}
							</Text>
						</View>
					)}

					<View style={styles.metaContainer}>
						<Icon
							source="clock-outline"
							size={16}
							color={theme.colors.primary}
						/>
						<Text variant="bodySmall" style={styles.metaText}>
							{formattedStartDate} - {formattedEndDate}
						</Text>
					</View>
				</View>
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

const stylesheet = createStyleSheet(({ colors }, { insets }) => ({
	screen: {
		flex: 1,
		paddingTop: insets.top,
	},
	listContainer: {
		padding: 16,
	},
	card: {
		marginVertical: 8,
		backgroundColor: colors.surface,
	},
	cardContent: {
		flexDirection: "row",
		padding: 16,
		columnGap: 16,
	},
	timeline: {
		justifyContent: "center",
		alignItems: "center",
		rowGap: 4,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: colors.secondary,
	},
	line: {
		flex: 1,
		width: 2,
		backgroundColor: colors.secondary,
	},
	details: {
		rowGap: 8,
	},
	mainText: {
		color: colors.onSurface,
	},
	metaContainer: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		gap: 8,
	},
	metaText: {
		color: colors.onSurface,
	},
}));
