#!/usr/bin/env node
import { Web3ApiClient } from "@web3api/client-js";
import { filesystemPlugin } from "@web3api/fs-plugin-js";
import { CoinGecko_Query, FooBar_Query, HelloWorld_Query } from "./w3";

(async () => {
  const client = new Web3ApiClient();

  // console.log("redirects", client.getRedirects());
  // console.log("envs", client.getEnvs());
  // console.log("plugins", client.getPlugins());
  // console.log("resolvers", client.getUriResolvers());

  // const clientWithOverrides = new Web3ApiClient({
  //   plugins: [
  //     {
  //       uri: "ens/fs.web3api.eth",
  //       plugin: filesystemPlugin({ query: {}})
  //     }
  //   ]
  // });

  // HELLO WORLD QUERY EXAMPLE
  // HelloWorld_Query.logMessage({message: "test"}, client);

  // CUSTOM FOOBAR WRAPPER EXAMPLE, RESOLVED THROUGH FS
  for (let i = 1; i < 21; i++) {
    console.log((await FooBar_Query.fooBar({ value: i }, client)).data);
  }  


  // COINGECKO PRICES EXAMPLE
  // let prices = await CoinGecko_Query.coinsList({}, client);
  // if (prices.data) {
  //   for (const price of prices.data) {
  //     console.log(`${price.id} ${price.name} ${price.symbol}`);
  //   }
  // }

  // LIST CLIENT PLUGINS (COMPARE CLIENT AND CLIENT WITH OVERRIDES)
  // console.log(client.getPlugins().length);
  // console.log(clientWithOverrides.getPlugins().length);
})();