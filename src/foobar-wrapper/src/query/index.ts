import {
  Input_fooBar
} from "./w3";

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