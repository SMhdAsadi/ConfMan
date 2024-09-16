import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner-native";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1 * 60 * 60 * 1000,
			gcTime: Number.POSITIVE_INFINITY,
			retry: false,
		},
		mutations: {
			retry: false,
			onError(error) {
				toast.error(error.message);
			},
		},
	},
});
