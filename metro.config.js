// Metro config with NativeWind support
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import("expo/metro-config").MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  // This must match the CSS file where you put `@tailwind` directives
  input: "./global.css",
});

