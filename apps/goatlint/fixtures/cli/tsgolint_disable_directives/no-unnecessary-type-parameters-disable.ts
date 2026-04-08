// This disable directive is USED even when the tsgolint diagnostic has labeled ranges.
// goatlint-disable-next-line typescript/no-unnecessary-type-parameters
export function parseYAML<T>(
  input: string,
): T {
  // goatlint-disable-next-line typescript/no-unsafe-type-assertion
  return input as any as T;
}
