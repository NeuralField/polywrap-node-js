#!/usr/bin/env node

import { ClientConfigBuilder, PolywrapClient } from "@polywrap/client-js";
import { PluginPackage } from "@polywrap/plugin-js";
import { TextEncoder } from "util";

(async () => {
  const config = new ClientConfigBuilder()
  .addDefaults()
  .addPackage("wrap://ipfs/QmczB9WjLgZuuBhHwCAaCGNguTBoSFqUqa7fdLpYiJx5VL", PluginPackage.from(mod => {
    return {
      "getResource": async (args: any) => {
        console.log("GET RESOURCE", args.filePath);
        return new TextEncoder().encode(`
        function doStuff(args) {
          function alog(a) {
            var x = subinvoke("ens/logger.eth", "debug", { prop: "as" });
           x = subinvoke("ens/logger.eth", "debug", { prop: "as2" });
            return "x";
          };

          let b = alog("a");
          return {
            prop2: b
          };
        }`);
      }
    };
  }))
  .addPackage("wrap://mock/dep", PluginPackage.from(mod => {
    return {
      "callMe": async (args: any) => {
        return "prop: " + args.prop;
      }
    };
  }))
  .addPackage("wrap://ens/logger.eth", PluginPackage.from(mod => {
    return {
      "debug": async (args: any) => {
        console.log("DEBUG", args.prop);
        return args;
      }
    };
  }))
  .build();
const client = new PolywrapClient(config);

const result = await client.invoke<{
  prop2: string
}>({
  uri: "wrap://ipfs/QmcD3YRWg2uMUkrmZZWqnDhmxSEmvaGBV5XUFuGcEao5w4",
  method: "doStuff",
  args: {
    prop1: "Hello"
  },
});

!result.ok && console.log("Error", result);
result.ok && console.log("RESULT", result.value);
})();
