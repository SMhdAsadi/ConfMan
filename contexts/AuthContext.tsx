import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import {
	type PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

type AuthContext = {
	session: Session | null;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

// using a variable outside AuthProvider to make it accessable outside of React Tree
let currentSession: Session | null = null;

export function AuthProvider(props: PropsWithChildren<object>) {
	const { children } = props;
	const [session, setSession] = useState<Session | null>(null);

	const updateSession = useCallback((session: Session | null) => {
		setSession(session);
		currentSession = session;
	}, []);

	useEffect(() => {
		checkSession();
	}, []);

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			updateSession(newSession);
		});

		return data.subscription.unsubscribe;
	}, [updateSession]);

	async function checkSession() {
		const { data } = await supabase.auth.getSession();

		updateSession(data.session);
	}

	return (
		<AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}

export function useIsLoggedIn() {
	const { session } = useAuth();
	return !!session;
}

export function useIsLoggedOut() {
	return !useIsLoggedIn();
}

export function useUser() {
	const { session } = useAuth();
	return session?.user ?? null;
}

export function getSession() {
	return currentSession;
}
