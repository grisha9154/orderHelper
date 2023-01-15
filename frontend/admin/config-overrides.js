const RemovePlugin = require("remove-files-webpack-plugin");

module.exports = function override(config, env) {
  config.plugins.push(
    new RemovePlugin({
      watch: {
        include: ["./node_modules/packages/node_modules"],
      },
    })
  );
  return config;
};
