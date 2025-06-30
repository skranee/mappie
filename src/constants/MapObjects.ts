import Architecture from '@/assets/icons/architecture.svg';
import Culture from '@/assets/icons/culture.svg';
import Entertainments from '@/assets/icons/entertainments.svg';
import History from '@/assets/icons/history.svg';
import Industrial from '@/assets/icons/industrial.svg';
import Nature from '@/assets/icons/nature.svg';
import Other from '@/assets/icons/other.svg';
import Religion from '@/assets/icons/religion.svg';
import Sport from '@/assets/icons/sport.svg';
import TourismBank from '@/assets/icons/tourism_bank.svg';
import TourismBike from '@/assets/icons/tourism_bike.svg';
import TourismCar from '@/assets/icons/tourism_car.svg';
import TourismCoffee from '@/assets/icons/tourism_coffee.svg';
import TourismGas from '@/assets/icons/tourism_gas.svg';
import TourismMeal from '@/assets/icons/tourism_meal.svg';
import TourismShop from '@/assets/icons/tourism_shop.svg';
import TourismSleep from '@/assets/icons/tourism_sleep.svg';

export type MapObject = {
  icon: string;
  name: string;
  categories: string[];
};

export const DEFAULT_DESCRIPTION = `
Великолепное место с великолепными видами. Незабываемые ощущения с морем позитива гарантированы!
`;

export const MAP_OBJECTS: MapObject[] = [
  {
    icon: Nature,
    name: 'Природа',
    categories: [
      'natural=peak',
      'natural=waterfall',
      'natural=wood',
      'leisure=park',
      'landuse=forest',
      'natural=bay',
    ],
  },
  {
    icon: Culture,
    name: 'Культура',
    categories: ['amenity=theatre', 'amenity=arts_centre', 'amenity=library', 'tourism=gallery'],
  },
  {
    icon: History,
    name: 'История',
    categories: ['historic=castle', 'historic=archaeological_site', 'tourism=attraction'],
  },
  {
    icon: Religion,
    name: 'Религия',
    categories: [
      'amenity=place_of_worship',
      'building=church',
      'building=mosque',
      'building=temple',
    ],
  },
  {
    icon: Architecture,
    name: 'Архитектура',
    categories: ['building=historic', 'building=heritage', 'tourism=monument'],
  },
  {
    icon: Industrial,
    name: 'Индустриальные объекты',
    categories: ['landuse=industrial', 'man_made=works'],
  },
  {
    icon: Other,
    name: 'Разное',
    categories: ['amenity=information', 'amenity=viewpoint', 'tourism=viewpoint'],
  },
  {
    icon: Entertainments,
    name: 'Развлечения',
    categories: ['amenity=cinema', 'amenity=nightclub', 'amenity=bar'],
  },
  {
    icon: Sport,
    name: 'Спорт',
    categories: ['leisure=sports_centre', 'leisure=stadium', 'leisure=pitch'],
  },
  {
    icon: TourismCar,
    name: 'Туристическая инфраструктура - авто',
    categories: ['amenity=parking'],
  },
  {
    icon: TourismGas,
    name: 'Туристическая инфраструктура - заправки',
    categories: ['amenity=fuel'],
  },
  {
    icon: TourismBike,
    name: 'Туристическая инфраструктура - велосипеды',
    categories: ['amenity=bicycle_rental', 'amenity=bicycle_parking'],
  },
  {
    icon: TourismShop,
    name: 'Туристическая инфраструктура - магазины',
    categories: ['shop=gift', 'shop=travel_agency', 'shop=supermarket'],
  },
  {
    icon: TourismMeal,
    name: 'Туристическая инфраструктура - еда',
    categories: ['amenity=restaurant', 'amenity=cafe', 'amenity=fast_food'],
  },
  {
    icon: TourismCoffee,
    name: 'Туристическая инфраструктура - кофе/чай',
    categories: ['amenity=cafe', 'amenity=coffee_shop'],
  },
  {
    icon: TourismBank,
    name: 'Туристическая инфраструктура - банки',
    categories: ['amenity=bank', 'amenity=atm'],
  },
  {
    icon: TourismSleep,
    name: 'Место для сна',
    categories: ['tourism=hotel', 'tourism=hostel', 'tourism=camp_site'],
  },
];
