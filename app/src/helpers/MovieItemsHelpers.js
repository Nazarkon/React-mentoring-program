export const createMovieItemsList = (movieItemsList) => {
  if (!movieItemsList || !movieItemsList.length) return '-';

  if (movieItemsList.length > 2) return movieItemsList.join(',');

  return movieItemsList.join('&');
};
