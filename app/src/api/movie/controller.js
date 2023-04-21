import axios from 'axios';

import getMovieSerializer from './serializers/getMovieSerializer';
import getMovieByIdSerializer from './serializers/getMovieByIdSerializer';
const client = axios.create({
  baseURL: 'http://localhost:4000/movies'
});

export const getMovieList = (payload, ourRequest) => {
  console.log(ourRequest, 'ourRequest');
  const params = getMovieSerializer(payload.sortBy, payload.genre, payload.searchString);
  console.log(params);
  return new Promise((resolve, reject) => {
    client
      .get('/', { params, cancelToken: ourRequest.token })
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getMovieListById = (id) => {
  return new Promise((resolve, reject) => {
    client
      .get(`/${id}`)
      .then((response) => {
        resolve(getMovieByIdSerializer(response.data));
      })
      .catch((error) => {
        reject(error);
      });
  });
};
