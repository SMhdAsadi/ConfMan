"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_plugins_1 = require("@expo/config-plugins");
var withAndroidSplitArchitectures = function (expoConfig) {
    return (0, config_plugins_1.withAppBuildGradle)(expoConfig, function (gradleConfig) {
        var buildGradle = gradleConfig.modResults.contents;
        var importStatement = 'import com.android.build.OutputFile;';
        if (!buildGradle.includes(importStatement)) {
            buildGradle = "".concat(importStatement, "\n").concat(buildGradle);
        }
        if (buildGradle.includes('splits {') ||
            buildGradle.includes('applicationVariants.all {')) {
            return gradleConfig;
        }
        var customGradleConfig = "\n        splits {\n            abi {\n                reset()\n                enable true\n                universalApk true  // If true, also generate a universal APK\n                include \"armeabi-v7a\", \"x86\", \"x86_64\", \"arm64-v8a\"\n            }\n        }\n        // applicationVariants are e.g. debug, release\n        applicationVariants.all { variant ->\n            variant.outputs.each { output ->\n                // For each separate APK per architecture, set a unique version code as described here:\n                // https://developer.android.com/studio/build/configure-apk-splits.html\n                // Example: versionCode 1 will generate 1001 for armeabi-v7a, 1002 for x86, etc.\n                def versionCodes = [\"armeabi-v7a\": 1, \"x86\": 2, \"arm64-v8a\": 3, \"x86_64\": 4]\n                def abi = output.getFilter(com.android.build.OutputFile.ABI)\n                if (abi != null) {  // null for the universal-debug, universal-release variants\n                      output.versionCodeOverride = android.defaultConfig.versionCode * 1000 + versionCodes.get(abi)\n                }\n            }\n        }\n        ";
        gradleConfig.modResults.contents = buildGradle.replace('android {', "android {".concat(customGradleConfig));
        return gradleConfig;
    });
};
exports.default = withAndroidSplitArchitectures;
