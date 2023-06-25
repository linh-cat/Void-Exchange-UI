const ImportAlias = require("craco-alias")

module.exports = {
  plugins: [
    {
      plugin: ImportAlias,
      options: {
        source: "options",
        baseUrl: "src", // this is from where all search in files will start
        aliases: {
          "@components": "./components", // path from src folder
          "@icons": "./img/icons",
          "@img": "./img"
        }
      }
    }
  ],
  webpack: {
    configure: {
      ignoreWarnings: [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module && warning.module.resource.includes("node_modules") && warning.details && warning.details.includes("source-map-loader")
          );
        },
      ],
    },
  },
}
