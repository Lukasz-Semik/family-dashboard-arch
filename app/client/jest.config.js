module.exports = {
  moduleFileExtensions: ["ts", "js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.(ts|jsx)?$": "babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**/src/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  testURL: "http://localhost/",
  setupFiles: ["./jest.setup.js"],
  globals: {
    "vue-jest": {
      experimentalCSSCompile: false
    }
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/main.ts",
    "!src/constants/*.ts",
    "!src/i18n/*.ts",
    "!src/routes/*.ts",
    "!src/api/*.ts"
  ]
};
