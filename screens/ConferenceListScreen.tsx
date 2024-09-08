import type { Database } from "@/database.types";
import { supabase } from "@/lib/supabase";
import { useNavigation } from "@react-navigation/native";
import type { PostgrestError } from "@supabase/supabase-js";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { Appbar, Button, FAB, Text } from "react-native-paper";
import {
	UnistylesRuntime,
	createStyleSheet,
	useStyles,
} from "react-native-unistyles";

type Conference = Database["public"]["Tables"]["Conference"]["Row"];

function ConferenceListScreen() {
	const { styles } = useStyles(sheet);
	const navigation = useNavigation();
	const [conferences, setConferences] = useState<Conference[]>([]);
	const [error, setError] = useState<PostgrestError | null>(null);
	const [loading, setLoading] = useState(false);

	async function fetchConferences() {
		setLoading(true);
		setError(null);

		const { data: conferences, error } = await supabase
			.from("Conference")
			.select("*");

		setError(error);
		if (error === null) {
			setConferences(conferences);
		}

		setLoading(false);
	}

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
		[],
	);

	return (
		<View style={styles.screen}>
			<Appbar.Header>
				<Appbar.BackAction onPress={navigation.goBack} />
				<Appbar.Content title="Conference List" />
			</Appbar.Header>
			<View style={styles.content}>
				{error && <Text>Error: {error.message}</Text>}
				<FlatList
					data={conferences}
					renderItem={renderItem}
					keyExtractor={(item) => item.conference_id.toString()}
				/>
			</View>
			<FAB
				icon="refresh"
				label="refresh"
				style={styles.fab}
				loading={loading}
				disabled={loading}
				onPress={fetchConferences}
			/>
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
