export type Landmark = {
  id: number;
  lat: number;
  lon: number;
  name: string;
  description?: string;
  category: string[];
  wikidata?: string;
  wikipedia?: string;
  img: string;
};
