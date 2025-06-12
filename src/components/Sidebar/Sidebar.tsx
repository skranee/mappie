import styles from './Sidebar.module.css';
import { Button } from '@/components/controls/Button/Button.tsx';
import Lens from '@/assets/icons/lens.svg';
import Bookmark from '@/assets/icons/bookmark.svg';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <img src={'./logo.svg'} className={styles.sidebar__logo} alt='logo' />
      <div className={styles.sidebar__main}>
        <div className={styles.sidebar__buttons}>
          <Button version='blue' square={true} size='lg'>
            <img src={Lens} alt='lens' />
          </Button>
          <Button version='white' square={true} size='lg'>
            <img src={Bookmark} alt='bookmark' />
          </Button>
        </div>
        <img src={'./logo.svg'} className={styles.sidebar__avatar} alt='avatar' />
      </div>
    </div>
  );
};
