const presets = [
  ["@babel/env", {
    targets: {
      firefox: "45",
      chrome: "45",
      safari: "9.1.3"
    },
    useBuiltIns: "usage"
  }]
];

module.exports = { presets };
