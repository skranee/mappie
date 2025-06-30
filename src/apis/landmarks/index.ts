import axios from 'axios';

import { DEFAULT_DESCRIPTION } from '@/constants/MapObjects.ts';
import type { OverpassLandmark } from '@/types/apis/overpass';
import type { Landmark } from '@/types/landmark';
import { getCategories } from '@/utils/landmarks/getCategories.ts';
import { query } from '@/utils/landmarks/query.ts';
import { getDescription, getImage } from '@/utils/landmarks/wikiUtils.ts';

const url = import.meta.env.VITE_OVERPASS_API_URL;

export default class LandmarksAPI {
  public static async get(
    lat: number,
    lon: number,
    radius: number,
    types: string[]
  ): Promise<Landmark[]> {
    try {
      const data = query({ lat, lon, radius, types });
      const response = await axios.get<{ elements: OverpassLandmark[] }>(url, {
        params: { data },
      });
      const elements = response.data.elements || [];

      return await Promise.all(
        elements.map(async el => {
          const landmark: Landmark = {
            id: el.id,
            lat: el.lat ?? el.center?.lat ?? 0,
            lon: el.lon ?? el.center?.lon ?? 0,
            name: el.tags?.name || 'Нет названия',
            category: getCategories(el.tags || {}),
            wikidata: el.tags?.wikidata,
            wikipedia: el.tags?.wikipedia,
            img: './default_landmark.png',
            description: el.tags?.description || DEFAULT_DESCRIPTION,
          };

          if (!landmark.description && landmark.wikipedia) {
            const [lang, title] = landmark.wikipedia.split(':', 2);
            landmark.description = await getDescription(lang, title);
          }
          if (landmark.wikipedia) {
            const [lang, title] = landmark.wikipedia.split(':', 2);
            landmark.img = await getImage(lang, title);
          }

          return landmark;
        })
      );
    } catch (err) {
      console.error('Error in LandmarksAPI.get:', err);
      return [];
    }
  }
}
