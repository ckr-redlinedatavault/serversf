const { withWorkflow } = require("workflow/next");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withWorkflow(withPWA({
  reactStrictMode: true,
  turbopack: {},
}));

