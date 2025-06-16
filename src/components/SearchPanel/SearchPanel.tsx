import styles from './SearchPanel.module.css';
import type { MapObject } from '@/constants/MapObjects.ts';
import { Input } from '@/components/controls/Input/Input.tsx';
import { useState } from 'react';

interface SearchPanel {
  categories: MapObject[];
}

export const SearchPanel = ({ categories }: SearchPanel) => {
  const [radius, setRadius] = useState('1');

  const handleRadiusChange = (value: string) => {
    if (Number.isInteger(parseInt(value)) || !value) {
      setRadius(value);
    }
  };

  return (
    <div className={styles.searchPanel}>
      <div className={styles.searchPanel__categoriesContainer}>
        <ul className={styles.searchPanel__categories}>
          {categories.map(category => (
            <li key={`category-${category.name}`} className={styles.searchPanel__category}>
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
          value={radius}
          onChange={event => handleRadiusChange(event.target.value)}
        />
        <span>км</span>
      </div>
    </div>
  );
};
