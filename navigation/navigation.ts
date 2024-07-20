import useIsSignedIn from "@/hooks/useIsSignedIn";
import useIsSignedOut from "@/hooks/useIsSignedOut";
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
			if: useIsSignedIn,
			screens: {
				Home: HomeScreen,
				Profile: ProfileScreen,
				ConferenceList: ConferenceListScreen,
			},
		},
		SignedOut: {
			if: useIsSignedOut,
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
