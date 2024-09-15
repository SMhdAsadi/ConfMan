import type { Tables } from "@/database.types";
import { supabase } from "@/lib/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 20 as const;

type QueryInput = {
	conferenceId: number;
};

async function fetchProgramList(
	input: QueryInput,
	pageParam: number,
	signal: AbortSignal,
): Promise<Tables<"Program">[]> {
	const from = pageParam * PAGE_SIZE;
	const to = from + PAGE_SIZE - 1;

	const { data, error } = await supabase
		.from("Program")
		.select("*")
		.eq("conference_id", input.conferenceId)
		.range(from, to)
		.order("start_date", { ascending: false })
		.abortSignal(signal);

	if (error) throw error;

	return data;
}

export function useProgramListQuery(queryInput: QueryInput) {
	return useInfiniteQuery({
		queryKey: ["program", "list", queryInput.conferenceId.toString()],
		queryFn: ({ pageParam, signal }) =>
			fetchProgramList(queryInput, pageParam, signal),
		initialPageParam: 0,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (lastPage.length === PAGE_SIZE) return lastPageParam + 1;
			return undefined;
		},
		select: (data) => data.pages.flat(),
	});
}
