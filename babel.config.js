module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: 52,
          browsers: ["last 2 versions", "safari 7"]
        }
      }
    ]
  ]
};
