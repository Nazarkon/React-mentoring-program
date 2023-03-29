import React  from "react";
import "./styles/GenreList.scss"

const GenreList = (props) => {

  const { genreList, currentItem, updateList } = props;
    
    
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
  
  export default GenreList;
  