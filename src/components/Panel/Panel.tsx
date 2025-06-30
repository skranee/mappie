import { useEffect, useState } from 'react';

import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { Card } from '@/components/Card/Card.tsx';
import { Input } from '@/components/controls/Input/Input.tsx';
import { Details } from '@/components/Details/Details.tsx';
import { SearchPanel } from '@/components/SearchPanel/SearchPanel.tsx';
import { MAP_OBJECTS, type MapObject } from '@/constants/MapObjects.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { removeFavorite } from '@/store/slices/FavoritesSlice.ts';
import { setIsOpen, setMode } from '@/store/slices/PanelSlice.ts';
import type { Landmark } from '@/types/landmark.ts';

import styles from './Panel.module.css';

export const Panel = () => {
  const { mode, isOpen } = useAppSelector(state => state.panel);
  const favorites = useAppSelector(state => state.favorites.favorites);

  const dispatch = useAppDispatch();

  const [chosenPlace, setChosenPlace] = useState<Landmark | undefined>(undefined);
  const [searchValue, setSearchValue] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState<Landmark[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<MapObject[]>([]);

  useEffect(() => {
    if (searchValue) {
      if (mode === 'search') {
        setFilteredCategories(
          MAP_OBJECTS.filter(object =>
            object.name.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
      } else {
        setFilteredPlaces(
          favorites.filter(place => place.name.toLowerCase().includes(searchValue.toLowerCase()))
        );
      }
    } else {
      setFilteredPlaces(favorites);
      setFilteredCategories(MAP_OBJECTS);
    }
  }, [searchValue, favorites]);

  const goToDetails = (landmark: Landmark) => {
    setChosenPlace(landmark);

    dispatch(setMode('landmark'));
  };

  const removeFromSaved = (place: Landmark) => {
    dispatch(removeFavorite(place));
  };

  const goBack = () => {
    dispatch(setMode('saved'));
  };

  const closePanel = () => {
    dispatch(setIsOpen(false));
  };

  return (
    <div
      className={`
        ${styles.panel} 
        ${mode === 'landmark' ? styles.panel__landmark : ''} 
        ${isOpen ? '' : styles[`panel--closed`]}
      `}
    >
      <Input
        value={searchValue}
        version={'search'}
        placeholder='Место, адрес..'
        onChange={e => setSearchValue(e.target.value)}
      />
      <h3 className={styles.panel__title}>
        {mode === 'landmark' && (
          <img src={ArrowLeft} className={styles.panel__back} alt='arrow-left' onClick={goBack} />
        )}{' '}
        {mode === 'search' ? 'Искать:' : 'Избранное:'}
      </h3>
      {mode === 'saved' && (
        <ul className={styles.panel__cards}>
          {filteredPlaces.map((card, index) => (
            <li key={`card-${index}`}>
              <Card
                title={card.name}
                description={card.description || ''}
                image={card.img}
                goToDetails={() => goToDetails(card)}
                removeFromSaved={() => removeFromSaved(card)}
              />
            </li>
          ))}
        </ul>
      )}
      <button
        className={`
          ${styles.panel__closeBtn} 
          ${!isOpen && styles['panel__closeBtn--hidden']} 
          ${mode === 'landmark' && isOpen && styles['panel__closeBtn--expanded']}
        `}
        onClick={closePanel}
      >
        <img src={ArrowLeft} alt='close-arrow-left' />
      </button>
      {mode === 'search' && <SearchPanel allCategories={filteredCategories} />}
      {mode === 'landmark' && chosenPlace && <Details landmark={chosenPlace} />}
    </div>
  );
};
