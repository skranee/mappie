import styles from './Input.module.css';
import type { InputHTMLAttributes } from 'react';

import LensGray from '@/assets/icons/lens-gray.svg';

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  version: 'search' | 'number' | 'text';
  label?: string;
}

export const Input = ({ version = 'search', label = undefined, ...rest }: Input) => {
  return (
    <div className={`${styles.container} ${styles[`container--${version}`]}`}>
      {version === 'search' && <img src={LensGray} alt='lens' />}
      <input
        id={label}
        className={`
          ${styles.container__input} 
          ${styles[`container__input--${version}`]} 
          ${label ? styles['container__input--label'] : ''}
        `}
        placeholder={label}
        {...rest}
      />
      {label && (
        <label htmlFor={label} className={styles.container__label}>
          {label}
        </label>
      )}
    </div>
  );
};
