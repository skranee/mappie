export const convertToKm = (distance: number | undefined) => {
  if (!distance) {
    return 0;
  }

  return (distance / 1000).toFixed(1);
};

export const convertToMinutes = (seconds: number | undefined) => {
  if (!seconds) {
    return 0;
  }

  return Math.round(seconds / 60);
};
