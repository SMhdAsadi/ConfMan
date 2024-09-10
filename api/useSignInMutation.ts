import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";

type Input = {
	email: string;
	password: string;
};

async function signInWithPassword(input: Input) {
	const { data, error } = await supabase.auth.signInWithPassword(input);

	if (error) throw error;
	return data;
}

export function useSignInMutation() {
	return useMutation({
		mutationFn: signInWithPassword,
	});
}
