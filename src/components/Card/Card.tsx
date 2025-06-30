import ArrowRight from '@/assets/icons/arrow-right.svg';
import BookmarkRed from '@/assets/icons/bookmark-red.svg';

import styles from './Card.module.css';

type Card = {
  title: string;
  description: string;
  image: string;
  goToDetails: () => void;
  removeFromSaved: () => void;
};

export const Card = ({ title, description, image, goToDetails, removeFromSaved }: Card) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__main}>
        <img src={image} className={styles.card__image} alt='image' />
        <span className={styles.card__title}>{title}</span>
      </div>
      <div className={styles.card__secondary}>
        <span className={styles.card__description}>{description}</span>
        <div className={styles.card__buttons}>
          <img
            src={BookmarkRed}
            className={styles.card__button}
            alt='bookmark-red'
            onClick={removeFromSaved}
          />
          <img
            src={ArrowRight}
            className={styles.card__button}
            alt='arrow-right'
            onClick={goToDetails}
          />
        </div>
      </div>
    </div>
  );
};
