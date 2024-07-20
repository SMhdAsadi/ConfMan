import { supabase } from "@/lib/supabase";
import { storage } from "@/state/storage";
import { useEffect } from "react";

function useSetupSessionListener() {
	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, session) => {
			storage.set("session", JSON.stringify(session));
		});

		return data.subscription.unsubscribe;
	}, []);
}

export default useSetupSessionListener;
