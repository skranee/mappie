import type { ButtonHTMLAttributes } from 'react';

import type { ButtonColors } from '@/types/controls.ts';

import styles from './Button.module.css';

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  version: ButtonColors;
  square: boolean;
  size: 'sm' | 'md' | 'lg';
  wide?: boolean;
}

export const Button = ({
  version = 'white',
  size = 'sm',
  square = false,
  wide = false,
  children,
  ...rest
}: Button) => {
  return (
    <button
      className={`
      ${styles.button} 
      ${wide && styles['button--wide']}
      ${styles[`button--${version}`]} 
      ${styles[`button--${size}`]}
      ${square && styles[`button--square--${size}`]}
    `}
      {...rest}
    >
      {children}
    </button>
  );
};
