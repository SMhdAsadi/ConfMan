import useIsSignedIn from "@/hooks/useIsSignedIn";
import useIsSignedOut from "@/hooks/useIsSignedOut";
import DetailsScreen from "@/screens/DetailsScreen";
import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import {
	type StaticParamList,
	createStaticNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const RootStack = createNativeStackNavigator({
	groups: {
		SignedIn: {
			if: useIsSignedIn,
			screens: {
				Home: HomeScreen,
				Details: DetailsScreen,
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
