export const createMovieItemsList = (movieItemsList) => {
    if(!movieItemsList || !movieItemsList.length) return '-';

    return movieItemsList.join('&');
}