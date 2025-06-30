import { MAP_OBJECTS, type MapObject } from '@/constants/MapObjects';

export function getCategories(tags: Record<string, string | undefined>): string[] {
  const result = new Set<string>();

  const tagPairs = Object.entries(tags)
    .filter(([, v]) => !!v)
    .map(([k, v]) => `${k}=${v}`);

  for (const obj of MAP_OBJECTS as MapObject[]) {
    if (obj.categories.some(cat => tagPairs.includes(cat))) {
      result.add(obj.name);
    }
  }

  return Array.from(result);
}
