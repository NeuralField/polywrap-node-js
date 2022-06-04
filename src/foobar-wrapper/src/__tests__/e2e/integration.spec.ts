import { Web3ApiClient } from "@web3api/client-js";
import {
  buildAndDeployApi,
  initTestEnvironment,
  stopTestEnvironment,
} from "@web3api/test-env-js";
import path from "path";

import { getPlugins } from "../utils";
import { FooBar_Query } from "../types/w3";

jest.setTimeout(500000);

describe("FooBar", () => {
  let client: Web3ApiClient;
  let ensUri: string;

  beforeAll(async () => {
    const {
      ethereum: testEnvEtherem,
      ensAddress,
      registrarAddress,
      resolverAddress,
      ipfs,
    } = await initTestEnvironment();
    // deploy api
    const apiPath: string = path.join(
      path.resolve(__dirname),
      "..",
      "..",
      ".."
    );

    // get client
    const config = getPlugins(testEnvEtherem, ipfs, ensAddress);
    client = new Web3ApiClient(config);

    const api = await buildAndDeployApi({
      apiAbsPath: apiPath,
      ipfsProvider: ipfs,
      ensRegistryAddress: ensAddress,
      ensRegistrarAddress: registrarAddress,
      ensResolverAddress: resolverAddress,
      ethereumProvider: testEnvEtherem,
    });
    ensUri = `ens/testnet/${api.ensDomain}`;
  });

  afterAll(async () => {
    await stopTestEnvironment();
  });

  const fooBar = async(value: number): Promise<string> => {
    const response = await FooBar_Query.fooBar({ value: value }, client, ensUri);
    
    expect(response).toBeTruthy();
    expect(response.error).toBeFalsy();
    expect(response.data).not.toBeNull();

    return response.data as string;
  }

  it("sanity", async () => {
    //Foobar tests
    let fooBarResult = await fooBar(3);
    expect(fooBarResult).toBe("foo");

    fooBarResult = await fooBar(5);
    expect(fooBarResult).toBe("bar");

    fooBarResult = await fooBar(15);
    expect(fooBarResult).toBe("foobar");

    fooBarResult = await fooBar(2);
    expect(fooBarResult).toBe("2");
  });
});
