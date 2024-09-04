import type { ConfigContext, ExpoConfig } from "@expo/config";

const SLUG = "confman";
const VARIANT = process.env.APP_VARIANT ?? "dev";
const IS_DEV = VARIANT === "dev";

export default ({ config }: ConfigContext): ExpoConfig => {
	const bundleIdentifier = IS_DEV
		? "com.smhdasadi.ConfMan.dev"
		: "com.smhdasadi.ConfMan";
	const name = IS_DEV ? "ConfMan" : "ConfMan (DEV)";

	return {
		...config,
		name,
		slug: SLUG,
		ios: {
			bundleIdentifier: bundleIdentifier,
		},
		android: {
			package: bundleIdentifier,
		},
	};
};
