import {
  Ethereum_Query,
  Input_getData,
  Input_fooBar
} from "./w3";

export function getData(input: Input_getData): u32 {
  const res = Ethereum_Query.callContractView({
    address: input.address,
    method: "function get() view returns (uint256)",
    args: null,
    connection: input.connection
  }).unwrap();

  return U32.parseInt(res);
}

export function fooBar(input: Input_fooBar): string {
  const isFoo = input.value % 3 == 0;
  const isBar = input.value % 5 == 0;

  
  if (isFoo && isBar) {
    return "foobar";
  } else if (isBar) {
    return "bar";
  } else if (isFoo) {
    return "foo";
  } else {
    return input.value.toString();
  }
}