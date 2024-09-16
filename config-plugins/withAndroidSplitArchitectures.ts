import {type ConfigPlugin, withAppBuildGradle} from '@expo/config-plugins';

const withAndroidSplitArchitectures: ConfigPlugin<void> = (expoConfig) => {
  return withAppBuildGradle(expoConfig, (gradleConfig) => {
    let buildGradle: string = gradleConfig.modResults.contents;

    const importStatement = 'import com.android.build.OutputFile;';
    if (!buildGradle.includes(importStatement)) {
      buildGradle = `${importStatement}\n${buildGradle}`;
    }

    if (
      buildGradle.includes('splits {') ||
      buildGradle.includes('applicationVariants.all {')
    ) {
      return gradleConfig;
    }

    const customGradleConfig = `
        splits {
            abi {
                reset()
                enable true
                universalApk true  // If true, also generate a universal APK
                include "armeabi-v7a", "x86", "x86_64", "arm64-v8a"
            }
        }
        // applicationVariants are e.g. debug, release
        applicationVariants.all { variant ->
            variant.outputs.each { output ->
                // For each separate APK per architecture, set a unique version code as described here:
                // https://developer.android.com/studio/build/configure-apk-splits.html
                // Example: versionCode 1 will generate 1001 for armeabi-v7a, 1002 for x86, etc.
                def versionCodes = ["armeabi-v7a": 1, "x86": 2, "arm64-v8a": 3, "x86_64": 4]
                def abi = output.getFilter(com.android.build.OutputFile.ABI)
                if (abi != null) {  // null for the universal-debug, universal-release variants
                      output.versionCodeOverride = android.defaultConfig.versionCode * 1000 + versionCodes.get(abi)
                }
            }
        }
        `;

    gradleConfig.modResults.contents = buildGradle.replace(
      'android {',
      `android {${customGradleConfig}`,
    );

    return gradleConfig;
  });
};

export default withAndroidSplitArchitectures;
