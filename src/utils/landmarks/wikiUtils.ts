import axios from 'axios';

export async function getDescription(lang: string, title: string): Promise<string> {
  try {
    const res = await axios.get(`https://${lang}.wikipedia.org/w/api.php`, {
      params: {
        action: 'query',
        prop: 'extracts',
        exintro: true,
        explaintext: true,
        redirects: 1,
        format: 'json',
        titles: title,
        origin: '*',
      },
    });
    const pages = res.data.query.pages;
    const page = pages[Object.keys(pages)[0]];
    return page.extract || '';
  } catch {
    return '';
  }
}

export async function getImage(lang: string, title: string): Promise<string> {
  try {
    const res = await axios.get(`https://${lang}.wikipedia.org/w/api.php`, {
      params: {
        action: 'query',
        prop: 'pageimages',
        piprop: 'thumbnail',
        pithumbsize: 300,
        redirects: 1,
        format: 'json',
        titles: title,
        origin: '*',
      },
    });
    const pages = res.data.query.pages;
    const page = pages[Object.keys(pages)[0]];
    return page.thumbnail?.source || '';
  } catch {
    return '';
  }
}
