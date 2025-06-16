import styles from './Input.module.css';
import type { InputHTMLAttributes } from 'react';

import LensGray from '@/assets/icons/lens-gray.svg';

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  version: 'search' | 'number' | 'text';
}

export const Input = ({ version = 'search', ...rest }: Input) => {
  return (
    <div className={`${styles.container} ${styles[`container--${version}`]}`}>
      {version === 'search' && <img src={LensGray} alt='lens' />}
      <input className={`${styles.input} ${styles[`input--${version}`]}`} {...rest} />
    </div>
  );
};
