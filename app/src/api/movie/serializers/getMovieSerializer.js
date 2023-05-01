import { isGenreExist } from '../../../helpers/MovieItemsHelpers';
export default (sortType, genre, searchString) => {
  const params = {};

  if (sortType) {
    params.sortBy = sortType;
    params.sortOrder = 'desc';
  }

  if (genre && genre !== 'all') {
    params.filter = genre;
  }

  if (searchString) {
    if (isGenreExist(searchString)) {
      params.searchBy = 'genres';
      params.search = searchString;
    }

    if (!isGenreExist(searchString)) {
      params.searchBy = 'title';
      params.search = searchString;
    }
  }

  return params;
};
