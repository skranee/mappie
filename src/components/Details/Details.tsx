import styles from './Details.module.css';
import { Button } from '@/components/controls/Button/Button.tsx';

import BookmarkGray from '@/assets/icons/bookmark-gray.svg';
import Mark from '@/assets/icons/mark.svg';

type Details = {
  title: string;
  description: string;
  image: string;
};

export const Details = ({ title, description, image }: Details) => {
  return (
    <div className={styles.details}>
      <img src={image} className={styles.details__image} alt='image' />
      <div className={styles.details__badges}></div>
      <span className={styles.details__title}>{title}</span>
      <span className={styles.details__description}>{description}</span>
      <div className={styles.details__buttons}>
        <Button version='white' square={false} size='sm'>
          <img src={BookmarkGray} alt='bookmark-gray' />
          <span>Сохранено</span>
        </Button>
        <Button version='blue' square={false} size='sm'>
          <img src={Mark} alt='bookmark-gray' />
          <span>Маршрут</span>
        </Button>
      </div>
    </div>
  );
};
