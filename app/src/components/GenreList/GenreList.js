import React from 'react';
import PropTypes from 'prop-types';
import './GenreList.scss';

const GenreList = (props) => {
  const { genreList, currentItem, updateList } = props;

  console.log(currentItem, 'currentItem');
  console.log(genreList, 'genreList');

  return (
    <ul className="list-container">
      {genreList.map((item) => (
        <li
          key={item.id}
          className={item.id === currentItem.id ? 'item-light' : ''}
          onClick={() => updateList(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

GenreList.propTypes = {
  genreList: PropTypes.array.isRequired,
  currentItem: PropTypes.object.isRequired,
  updateList: PropTypes.func.isRequired
};

export default GenreList;
