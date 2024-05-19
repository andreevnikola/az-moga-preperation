export function numberTransformer(inp: string): number {
  return parseInt(inp);
}

export function coordsTransformer(inp: string): [number, number] {
  const [x, y] = inp.split(" ").map(numberTransformer);
  return [x, y];
}
