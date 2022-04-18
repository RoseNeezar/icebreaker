module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: ["@emotion/babel-plugin"],
};
