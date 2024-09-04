import type { ConfigContext, ExpoConfig } from "@expo/config";

const SLUG = "confman";
const VARIANT = process.env.APP_VARIANT ?? "dev";
const IS_DEV = VARIANT === "dev";
const VERSION = "0.0.1";

export default ({ config }: ConfigContext): ExpoConfig => {
	const bundleIdentifier = IS_DEV
		? "com.smhdasadi.ConfMan.dev"
		: "com.smhdasadi.ConfMan";
	const name = IS_DEV ? "ConfMan" : "ConfMan (DEV)";
	const versionCode = VERSION.split(".")
		.map(Number)
		.reduce((acc, cur) => acc * 1000 + cur, 0);

	return {
		...config,
		name,
		slug: SLUG,
		version: VERSION,
		runtimeVersion: VERSION,
		ios: {
			bundleIdentifier: bundleIdentifier,
			buildNumber: VERSION,
		},
		android: {
			package: bundleIdentifier,
			versionCode,
		},
	};
};
