/** @type {import('prettier').Config} */
module.exports = {
  useTabs: true,
  overrides: [
    {
      files: ["**/*.css", "**/*.scss"],
      options: {
        singleQuote: true,
      },
    },
  ],
  plugins: [
    "prettier-plugin-organize-attributes",
  ],
  attributeGroups: [
    "$ANGULAR_STRUCTURAL_DIRECTIVE",
    "$ANGULAR_OUTPUT",
    "$ANGULAR_TWO_WAY_BINDING",
    "$ANGULAR_INPUT",
  ],
};
