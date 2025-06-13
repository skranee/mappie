import styles from './Button.module.css';
import type { ButtonHTMLAttributes } from 'react';
import type { ButtonColors } from '@/types/controls.ts';

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  version: ButtonColors;
  square: boolean;
  size: 'sm' | 'md' | 'lg';
}

export const Button = ({
  version = 'white',
  size = 'sm',
  square = false,
  children,
  ...rest
}: Button) => {
  return (
    <button
      className={`
      ${styles.button} 
      ${styles[`button--${version}`]} 
      ${styles[`button--${size}`]}
      ${square ? styles[`button--square--${size}`] : ''}
    `}
      {...rest}
    >
      {children}
    </button>
  );
};
