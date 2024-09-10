import { useIsLoggedIn, useIsLoggedOut } from "@/contexts/AuthContext";
import ConferenceListScreen from "@/screens/ConferenceListScreen";
import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import {
	type StaticParamList,
	createStaticNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const RootStack = createNativeStackNavigator({
	screenOptions: {
		headerShown: false,
	},
	groups: {
		SignedIn: {
			if: useIsLoggedIn,
			screens: {
				Home: HomeScreen,
				Profile: ProfileScreen,
				ConferenceList: ConferenceListScreen,
			},
		},
		SignedOut: {
			if: useIsLoggedOut,
			screens: {
				Login: LoginScreen,
			},
		},
	},
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export const Navigation = createStaticNavigation(RootStack);
