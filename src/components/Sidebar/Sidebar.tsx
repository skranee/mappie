import styles from './Sidebar.module.css';
import { Button } from '@/components/controls/Button/Button.tsx';
import LensWhite from '@/assets/icons/lens-white.svg';
import LensBlue from '@/assets/icons/lens-blue.svg';
import BookmarkRed from '@/assets/icons/bookmark-red.svg';
import BookmarkWhite from '@/assets/icons/bookmark-white.svg';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { setMode } from '@/store/slices/PanelSlice.ts';
import { useEffect, useState } from 'react';
import type { ButtonColors } from '@/types/controls.ts';

export const Sidebar = () => {
  const mode = useAppSelector(state => state.panel.mode);

  const dispatch = useAppDispatch();

  const [searchColor, setSearchColor] = useState<ButtonColors>('white');
  const [savedColor, setSavedColor] = useState<ButtonColors>('white');
  const [lensColor, setLensColor] = useState<ButtonColors>('blue');
  const [bookmarkColor, setBookmarkColor] = useState<ButtonColors>('red');

  useEffect(() => {
    if (mode === 'search') {
      setSearchColor('white');
      setSavedColor('red');
      setLensColor('blue');
      setBookmarkColor('white');
    } else {
      setSearchColor('blue');
      setSavedColor('white');
      setLensColor('white');
      setBookmarkColor('red');
    }
  }, [mode]);

  const setModeSearch = () => {
    dispatch(setMode('search'));
  };

  const setModeSaved = () => {
    dispatch(setMode('saved'));
  };

  return (
    <div className={styles.sidebar}>
      <img src={'./logo.svg'} className={styles.sidebar__logo} alt='logo' />
      <div className={styles.sidebar__main}>
        <div className={styles.sidebar__buttons}>
          <Button version={searchColor} square={true} size='lg' onClick={setModeSearch}>
            <img src={lensColor === 'blue' ? LensBlue : LensWhite} alt='lens' />
          </Button>
          <Button version={savedColor} square={true} size='lg' onClick={setModeSaved}>
            <img src={bookmarkColor === 'white' ? BookmarkWhite : BookmarkRed} alt='bookmark' />
          </Button>
        </div>
        <img src={'./logo.svg'} className={styles.sidebar__avatar} alt='avatar' />
      </div>
    </div>
  );
};
