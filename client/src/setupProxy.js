const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://mern-amazonia.vercel.app",
      changeOrigin: true,
    })
  );
};
