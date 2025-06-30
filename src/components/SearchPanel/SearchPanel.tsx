import L from 'leaflet';

import LandmarksAPI from '@/apis/landmarks';
import Lens from '@/assets/icons/lens-white.svg';
import { Button } from '@/components/controls/Button/Button.tsx';
import { Input } from '@/components/controls/Input/Input.tsx';
import { Loader } from '@/components/Loader/Loader.tsx';
import type { MapObject } from '@/constants/MapObjects.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { useSearchPanel } from '@/hooks/useSearchPanel.ts';
import { setLoading } from '@/store/slices/AppSlice.ts';
import { setLandmarks } from '@/store/slices/MapSlice.ts';

import styles from './SearchPanel.module.css';

interface SearchPanel {
  allCategories: MapObject[];
}

export const SearchPanel = ({ allCategories }: SearchPanel) => {
  const dispatch = useAppDispatch();
  const { categories, radius, location } = useAppSelector(state => state.map);
  const { isLoading } = useAppSelector(state => state.app);

  const { handleCategoryClick, handleRadiusChange } = useSearchPanel();

  const search = async () => {
    dispatch(setLoading(true));

    const landmarks = await LandmarksAPI.get(
      L.latLng(location).lat,
      L.latLng(location).lng,
      radius,
      categories
    );

    dispatch(setLoading(false));

    dispatch(setLandmarks(landmarks));
  };

  return (
    <div className={styles.searchPanel}>
      <div className={styles.searchPanel__categoriesContainer}>
        <ul className={styles.searchPanel__categories}>
          {allCategories.map(category => (
            <li
              key={`category-${category.name}`}
              className={`
                ${styles.searchPanel__category} 
                ${categories.some(c => category.categories.includes(c)) && styles['searchPanel__category--chosen']}
              `}
              onClick={() => handleCategoryClick(category.name)}
            >
              <img
                src={category.icon}
                className={styles.searchPanel__categoryIcon}
                alt='category-icon'
              />
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <h3 className={styles.searchPanel__inputTitle}>В радиусе</h3>
      <div className={styles.searchPanel__inputContainer}>
        <Input
          version='number'
          value={radius / 1000}
          onChange={event => handleRadiusChange(event.target.value)}
        />
        <span>км</span>
      </div>
      <Button version='blue' square={false} size='md' wide onClick={search}>
        {isLoading ? <Loader /> : <img src={Lens} alt='lens' />}
      </Button>
    </div>
  );
};
