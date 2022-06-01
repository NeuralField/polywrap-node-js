#!/usr/bin/env node
import { Web3ApiClient } from "@web3api/client-js";
import { filesystemPlugin } from "@web3api/fs-plugin-js";

(async () => {
  const client = new Web3ApiClient();

  console.log("redirects", client.getRedirects());
  console.log("envs", client.getEnvs());
  console.log("plugins", client.getPlugins());
  console.log("resolvers", client.getUriResolvers());

  const clientWithOverrides = new Web3ApiClient({
    plugins: [
      {
        uri: "ens/fs.web3api.eth",
        plugin: filesystemPlugin({ query: {}})
      }
    ]
  });

  console.log(client.getPlugins().length);
  console.log(clientWithOverrides.getPlugins().length);
})();