module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: 52,
          ie: 11,
          browsers: ["last 4 versions", "safari 7"],
        },
      },
    ],
  ],
};
