import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { MMKV } from "react-native-mmkv";

const supabaseUrl = "https://ejbakgxbhvlczdjmejzl.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqYmFrZ3hiaHZsY3pkam1lanpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1NTg1OTgsImV4cCI6MjAzNDEzNDU5OH0._XBz6b7ys9iU5F7kNSPcpMNIIPNeTk99jGabuGqa5Hc";

const mmkvStorage = new MMKV({ id: "supabase" });

const storage = {
	setItem: (key: string, value: string) => {
		mmkvStorage.set(key, value);
	},
	getItem: (key: string) => {
		const value = mmkvStorage.getString(key);
		return value === undefined ? null : value;
	},
	removeItem: (key: string) => {
		mmkvStorage.delete(key);
	},
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: storage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});
