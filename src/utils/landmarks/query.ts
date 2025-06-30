export function query({
  lat,
  lon,
  radius,
  types,
}: {
  lat: number;
  lon: number;
  radius: number;
  types: string[];
}): string {
  const header = `[out:json][timeout:25];\n(`;

  const filters = types
    .map(t =>
      ['node', 'way', 'relation']
        .map(el => `  ${el}(around:${radius - 300},${lat},${lon})[${t}];`)
        .join('\n')
    )
    .join('\n');

  const footer = `\n);\nout center;`;

  return header + '\n' + filters + footer;
}
