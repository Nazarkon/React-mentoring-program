import { isGenreExist } from '../../../helpers/MovieItemsHelpers';
export default (sortType, genre, searchString) => {
  const params = {};

  console.log(sortType, 'sortType');
  console.log(genre, 'genre');
  console.log(searchString, 'searchString');

  if (sortType) {
    params.sortBy = sortType;
    params.sortOrder = 'desc';
  }

  if (genre && genre.id !== 'all') {
    params.filter = genre.name;
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

  console.log(params, 'end serealizer');

  return params;
};
