// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Or whatever base path your API calls use
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true, // This is the key! It sets the Host header to the target URL
    })
  );
};