module.exports = {
  globDirectory: "build/",
  globPatterns: [
    "**/*.{js,css,html,png,svg,ico,woff2,json,webp,jpg,jpeg,gif}"
  ],
  swSrc: "src/service-worker.js",
  swDest: "build/service-worker.js",
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
  // Exclude source maps and manifest from precaching
  globIgnores: [
    "**/*.map",
    "asset-manifest.json"
  ],
};
