import { query } from '../landmarks/query';

describe('query function', () => {
  it('should generate correct OSM query with single type', () => {
    const params = {
      lat: 55.7558,
      lon: 37.6176,
      radius: 1000,
      types: ['amenity=cafe'],
    };

    const result = query(params);

    // Проверяем основные части запроса
    expect(result).toContain('[out:json][timeout:25];');
    expect(result).toContain('node(around:700,55.7558,37.6176)[amenity=cafe]');
    expect(result).toContain('way(around:700,55.7558,37.6176)[amenity=cafe]');
    expect(result).toContain('relation(around:700,55.7558,37.6176)[amenity=cafe]');
    expect(result).toContain('out center;');
  });

  it('should generate correct OSM query with multiple types', () => {
    const params = {
      lat: 59.9343,
      lon: 30.3351,
      radius: 1500,
      types: ['shop=supermarket', 'amenity=pharmacy'],
    };

    const result = query(params);

    // Проверяем все элементы для первого типа
    expect(result).toContain('node(around:1200,59.9343,30.3351)[shop=supermarket]');
    expect(result).toContain('way(around:1200,59.9343,30.3351)[shop=supermarket]');
    expect(result).toContain('relation(around:1200,59.9343,30.3351)[shop=supermarket]');

    // Проверяем все элементы для второго типа
    expect(result).toContain('node(around:1200,59.9343,30.3351)[amenity=pharmacy]');
    expect(result).toContain('way(around:1200,59.9343,30.3351)[amenity=pharmacy]');
    expect(result).toContain('relation(around:1200,59.9343,30.3351)[amenity=pharmacy]');
  });

  it('should correctly handle radius adjustment', () => {
    const params = {
      lat: 0,
      lon: 0,
      radius: 500,
      types: ['amenity=restaurant'],
    };

    const result = query(params);
    expect(result).toContain('around:200,0,0');
  });

  it('should handle empty types array', () => {
    const params = {
      lat: 55.7558,
      lon: 37.6176,
      radius: 1000,
      types: [],
    };

    const result = query(params);

    // Проверяем базовую структуру запроса
    expect(result).toContain('[out:json][timeout:25];');
    expect(result).toContain('out center;');

    // Проверяем, что между ними только скобки без лишних элементов
    const between = result.split('[out:json][timeout:25];\n(')[1].split(');\nout center;')[0];
    expect(between.trim()).toBe('');
  });

  it('should generate proper query structure', () => {
    const params = {
      lat: 55.7558,
      lon: 37.6176,
      radius: 1000,
      types: ['amenity=bank'],
    };

    const result = query(params);

    // Проверяем начало и конец запроса
    expect(result.startsWith('[out:json][timeout:25];\n(')).toBeTruthy();
    expect(result.endsWith(');\nout center;')).toBeTruthy();

    // Проверяем наличие всех элементов
    expect(result).toContain('node(around:700,55.7558,37.6176)[amenity=bank]');
    expect(result).toContain('way(around:700,55.7558,37.6176)[amenity=bank]');
    expect(result).toContain('relation(around:700,55.7558,37.6176)[amenity=bank]');
  });
});
