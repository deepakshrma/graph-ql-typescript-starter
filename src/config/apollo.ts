import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
export const plugins = [
  process.env.NODE_ENV === "production"
    ? ApolloServerPluginLandingPageDisabled()
    : ApolloServerPluginLandingPageGraphQLPlayground({
        settings: {
          "editor.cursorShape": "line", // possible values: 'line', 'block', 'underline'
          "editor.fontFamily": `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
          "editor.fontSize": 14,
          "editor.reuseHeaders": true, // new tab reuses headers from last tab
          "editor.theme": "light", // possible values: 'dark', 'light'
          "general.betaUpdates": false,
          // 'prettier.printWidth': 80,
          // 'prettier.tabWidth': 2,
          // 'prettier.useTabs': false,
          "request.credentials": "omit", // possible values: 'omit', 'include', 'same-origin'
          "schema.polling.enable": true, // enables automatic schema polling
          "schema.polling.endpointFilter": "*localhost*", // endpoint filter for schema polling
          "schema.polling.interval": 10000, // schema polling interval in ms
          // 'schema.disableComments': "boolean",
          "tracing.hideTracingResponse": true,
          // 'tracing.tracingSupported': true, // set false to remove x-apollo-tracing header from Schema fetch requests
        },
      }),
];
