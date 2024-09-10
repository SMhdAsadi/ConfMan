import { supabase } from "@/lib/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 20 as const;

async function fetchConferenceList(pageParam: number, signal: AbortSignal) {
	const from = pageParam * PAGE_SIZE;
	const to = from + PAGE_SIZE - 1;

	const { data, error } = await supabase
		.from("Conference")
		.select("*")
		.range(from, to)
		.order("start_date", { ascending: false })
		.abortSignal(signal);

	if (error) throw error;

	return data;
}

export function useConferenceListQuery() {
	return useInfiniteQuery({
		queryKey: ["conference", "list"],
		queryFn: ({ pageParam, signal }) => fetchConferenceList(pageParam, signal),
		initialPageParam: 0,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (lastPage.length === PAGE_SIZE) return lastPageParam + 1;
			return undefined;
		},
		select: (data) => data.pages.flat(),
	});
}
