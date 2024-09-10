import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1 * 60 * 60 * 1000,
			gcTime: Number.POSITIVE_INFINITY,
			retry: false,
		},
		mutations: {
			retry: false,
		},
	},
});
