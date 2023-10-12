const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://mern-amazonia-api.vercel.app",
      changeOrigin: true,
    })
  );
};
