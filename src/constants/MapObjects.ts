import Nature from '@/assets/icons/nature.svg';
import Culture from '@/assets/icons/culture.svg';
import History from '@/assets/icons/history.svg';
import Religion from '@/assets/icons/religion.svg';
import Architecture from '@/assets/icons/architecture.svg';
import Industrial from '@/assets/icons/industrial.svg';
import Other from '@/assets/icons/other.svg';
import Entertainments from '@/assets/icons/entertainments.svg';
import Sport from '@/assets/icons/sport.svg';
import TourismCar from '@/assets/icons/tourism_car.svg';
import TourismGas from '@/assets/icons/tourism_gas.svg';
import TourismBike from '@/assets/icons/tourism_bike.svg';
import TourismShop from '@/assets/icons/tourism_shop.svg';
import TourismMeal from '@/assets/icons/tourism_meal.svg';
import TourismCoffee from '@/assets/icons/tourism_coffee.svg';
import TourismBank from '@/assets/icons/tourism_bank.svg';
import TourismSleep from '@/assets/icons/tourism_sleep.svg';

export type MapObject = {
  icon: string;
  name: string;
};

export const MAP_OBJECTS: MapObject[] = [
  {
    icon: Nature,
    name: 'Природа',
  },
  {
    icon: Culture,
    name: 'Культура',
  },
  {
    icon: History,
    name: 'История',
  },
  {
    icon: Religion,
    name: 'Религия',
  },
  {
    icon: Architecture,
    name: 'Архитектура',
  },
  {
    icon: Industrial,
    name: 'Индустриальные объекты',
  },
  {
    icon: Other,
    name: 'Разное',
  },
  {
    icon: Entertainments,
    name: 'Развлечения',
  },
  {
    icon: Sport,
    name: 'Спорт',
  },
  {
    icon: TourismCar,
    name: 'Туристическая инфраструктура - авто',
  },
  {
    icon: TourismGas,
    name: 'Туристическая инфраструктура - заправки',
  },
  {
    icon: TourismBike,
    name: 'Туристическая инфраструктура - велосипеды',
  },
  {
    icon: TourismShop,
    name: 'Туристическая инфраструктура - магазины',
  },
  {
    icon: TourismMeal,
    name: 'Туристическая инфраструктура - еда',
  },
  {
    icon: TourismCoffee,
    name: 'Туристическая инфраструктура - кофе/чай',
  },
  {
    icon: TourismBank,
    name: 'Туристическая инфраструктура - банки',
  },
  {
    icon: TourismSleep,
    name: 'Место для сна',
  },
];
