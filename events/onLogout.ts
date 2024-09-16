import { queryClient } from "@/lib/queryClient";
import { storage } from "@/state/storage";
import { Image } from "expo-image";

export async function onLogout() {
	await Promise.all([
		Image.clearDiskCache(),
		Image.clearMemoryCache(),
		queryClient.cancelQueries(),
	]);

	queryClient.removeQueries();
	queryClient.clear();
	storage.clearAll();
}
