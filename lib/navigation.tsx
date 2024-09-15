import { useIsLoggedIn, useIsLoggedOut } from "@/contexts/AuthContext";
import AttendanceListScreen from "@/screens/AttendanceListScreen";
import ConferenceListScreen from "@/screens/ConferenceListScreen";
import LoginScreen from "@/screens/LoginScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import ProgramListScreen from "@/screens/ProgramListScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	type StaticParamList,
	createStaticNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "react-native-paper";

const HomeStack = createNativeStackNavigator({
	screenOptions: {
		headerShown: false,
	},
	screens: {
		ConferenceListScreen,
		ProgramListScreen,
		AttendanceListScreen,
	},
});

const BottomTab = createBottomTabNavigator({
	screenOptions: {
		headerShown: false,
	},
	screens: {
		HomeStack: {
			screen: HomeStack,
			options: {
				title: "Home",
				tabBarIcon: ({ color, size }) => (
					<Icon source="home" size={size} color={color} />
				),
			},
		},
		ProfileScreen: {
			screen: ProfileScreen,
			options: {
				title: "Profile",
				tabBarIcon: ({ color, size }) => (
					<Icon source="account" size={size} color={color} />
				),
			},
		},
	},
});

const RootStack = createNativeStackNavigator({
	screenOptions: {
		headerShown: false,
	},
	groups: {
		SignedIn: {
			if: useIsLoggedIn,
			screens: {
				BottomTab,
			},
		},
		SignedOut: {
			if: useIsLoggedOut,
			screens: {
				LoginScreen,
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
