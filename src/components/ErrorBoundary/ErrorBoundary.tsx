import React from 'react';

import styles from './ErrorBoundary.module.css';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Ошибка:', error, errorInfo);
  }

  render(): React.ReactNode {
    const { hasError, error } = this.state;

    if (hasError && error) {
      return (
        <>
          <div className={styles.error}>
            <h1>Упс... Что-то пошло не так</h1>
            <summary className={styles.error__message}>{error.message}</summary>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}
