import styles from './Sidebar.module.css';
import { Button } from '@/components/controls/Button/Button.tsx';
import LensWhite from '@/assets/icons/lens-white.svg';
import LensBlue from '@/assets/icons/lens-blue.svg';
import BookmarkRed from '@/assets/icons/bookmark-red.svg';
import BookmarkWhite from '@/assets/icons/bookmark-white.svg';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { setIsOpen, setMode } from '@/store/slices/PanelSlice.ts';
import { useEffect, useState } from 'react';
import type { ButtonColors } from '@/types/controls.ts';
import { useNavigate } from 'react-router-dom';
import Exit from '@/assets/icons/exit.svg';

export const Sidebar = () => {
  const mode = useAppSelector(state => state.panel.mode);
  const isOpen = useAppSelector(state => state.panel.isOpen);
  const email = useAppSelector(state => state.user.email);
  const avatar = useAppSelector(state => state.user.avatar);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchColor, setSearchColor] = useState<ButtonColors>('white');
  const [savedColor, setSavedColor] = useState<ButtonColors>('white');
  const [lensColor, setLensColor] = useState<ButtonColors>('blue');
  const [bookmarkColor, setBookmarkColor] = useState<ButtonColors>('red');

  useEffect(() => {
    if (mode === 'search' && isOpen) {
      setSearchColor('white');
      setSavedColor('red');
      setLensColor('blue');
      setBookmarkColor('white');
    } else if ((mode === 'landmark' || mode === 'saved') && isOpen) {
      setSearchColor('blue');
      setSavedColor('white');
      setLensColor('white');
      setBookmarkColor('red');
    } else {
      setSearchColor('blue');
      setSavedColor('red');
      setLensColor('white');
      setBookmarkColor('white');
    }
  }, [mode, isOpen]);

  const setModeSearch = () => {
    dispatch(setIsOpen(true));
    dispatch(setMode('search'));
  };

  const setModeSaved = () => {
    dispatch(setIsOpen(true));
    dispatch(setMode('saved'));
  };

  const goToAuth = () => {
    navigate('/auth');
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
        {email ? (
          <img src={avatar || '/logo.svg'} className={styles.sidebar__avatar} alt='avatar' />
        ) : (
          <Button version='gray-light' square={true} size='md' onClick={goToAuth}>
            <img src={Exit} alt='exit' />
          </Button>
        )}
      </div>
    </div>
  );
};
