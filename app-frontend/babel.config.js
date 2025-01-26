export const presets = ["module:metro-react-native-babel-preset"];
export const plugins = [
  ["module:react-native-dotenv", { moduleName: "@env", path: ".env" }],
  ["@babel/plugin-transform-private-methods", { loose: true }],
  ["@babel/plugin-transform-class-properties", { loose: true }],
  ["@babel/plugin-transform-private-property-in-object", { loose: true }],
];
