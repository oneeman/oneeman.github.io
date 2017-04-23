module.exports = {
  "extends": "airbnb",
  "plugins": [
      "react",
      "jsx-a11y",
      "import"
  ],
  "rules": {
    "quotes": "off",
    "no-unused-vars": "warn",
    "object-curly-spacing": "off",
    "comma-dangle": "off",
    "jsx-a11y/href-no-hash": "off",
    "radix": "off",
    "no-use-before-define": "off",
    "arrow-body-style": "off",
    "max-len": ["warn", {code: 120}],
    "react/forbid-prop-types": "off"
  },
  "globals": {
    "document": true,
    "window": true,
    "fetch": true
  }
};
