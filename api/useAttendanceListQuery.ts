import type { Tables } from "@/database.types";
import { supabase } from "@/lib/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 20 as const;

type QueryInput = {
	conferenceId: number;
};

async function fetchAttendanceList(
	input: QueryInput,
	pageParam: number,
	signal: AbortSignal,
): Promise<Tables<"Participant">[]> {
	const from = pageParam * PAGE_SIZE;
	const to = from + PAGE_SIZE - 1;

	const { data, error } = await supabase
		.from("Attendance")
		.select("participant_id, Participant(*)")
		.eq("conference_id", input.conferenceId)
		.range(from, to)
		.order("registration_date", { ascending: false })
		.abortSignal(signal);

	if (error) throw error;

	return data.map((d) => d.Participant).filter((d) => !!d);
}

export function useAttendanceListQuery(queryInput: QueryInput) {
	return useInfiniteQuery({
		queryKey: ["attendance", "list", queryInput.conferenceId.toString()],
		queryFn: ({ pageParam, signal }) =>
			fetchAttendanceList(queryInput, pageParam, signal),
		initialPageParam: 0,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (lastPage.length === PAGE_SIZE) return lastPageParam + 1;
			return undefined;
		},
		select: (data) => data.pages.flat(),
	});
}
