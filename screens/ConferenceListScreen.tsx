import { useConferenceListQuery } from "@/api/useConferenceListQuery";
import type { Tables } from "@/database.types";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import {
	UnistylesRuntime,
	createStyleSheet,
	useStyles,
} from "react-native-unistyles";

type Conference = Tables<"Conference">;

function ConferenceListScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();

	const { data, error, isFetching, refetch } = useConferenceListQuery();

	const renderItem = useCallback(
		({ item }: { item: Conference }) => (
			<View style={styles.item}>
				<Text style={styles.title}>{item.name}</Text>
				<Text>{item.description}</Text>
				<Text>{item.location}</Text>
				<Text>{new Date(item.start_date * 1000).toLocaleString()}</Text>
				<Text>{new Date(item.end_date * 1000).toLocaleString()}</Text>
			</View>
		),
		[styles],
	);

	return (
		<View style={styles.screen}>
			<Appbar.Header>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Conferences" />
			</Appbar.Header>
			<View style={styles.content}>
				{error && <Text>Error: {error.message}</Text>}
				<FlatList
					data={data}
					renderItem={renderItem}
					refreshControl={
						<RefreshControl refreshing={isFetching} onRefresh={refetch} />
					}
					keyExtractor={(item) => item.conference_id.toString()}
				/>
			</View>
		</View>
	);
}

export default ConferenceListScreen;

const sheet = createStyleSheet(({ colors }) => ({
	screen: {
		flex: 1,
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: UnistylesRuntime.insets.bottom,
	},
	item: {
		backgroundColor: "#f9c2ff",
		padding: 20,
		marginVertical: 8,
	},
	title: {
		fontSize: 24,
	},
}));
