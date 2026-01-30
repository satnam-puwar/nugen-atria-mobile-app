module.exports = function (api) {
  api.cache(true);

  return {
    // Use NativeWind as a preset (not a plugin)
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Other Babel plugins – Reanimated must be last
    plugins: ["react-native-reanimated/plugin"],
  };
};


