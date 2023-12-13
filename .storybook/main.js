/** @type { import('@storybook/web-components-webpack5').StorybookConfig } */
import LwcWebpackPlugin from "lwc-webpack-plugin";
import path from "path";

const config = {
  stories: ["../force-app/main/default/lwc/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/web-components-webpack5",
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  staticDirs: ["./assets"],
  docs: {
    autodocs: "tag"
  },
  async webpackFinal(config, { configType }) {
    return {
      ...config,
      plugins: [...config.plugins, new LwcWebpackPlugin()],
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          // Idea was taken from
          // https://github.com/trailheadapps/lwc-recipes/blob/main/jest.config.js
          "lightning/uiRecordApi": require.resolve(
            path.resolve(__dirname, "stubs/uiRecordApi")
          )
        }
      },
      module: {
        ...config.module,
        rules: [
          ...(config.module?.rules?.filter((rule) => {
            if (typeof rule.test === "string")
              return !rule.test.includes(".css");
            if (rule.test instanceof RegExp) return !rule.test.test(".css");

            return true;
          }) ?? []),
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
            exclude: [
              /node_modules\/lightning-base-components/,
              /lwc\/copilotIntegration/
            ]
          }
        ]
      }
    };
  }
};
export default config;
