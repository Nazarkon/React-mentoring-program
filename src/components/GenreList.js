import React, { useEffect } from "react";
import "./GenreList.scss"

const GenreList = (props) => {

    const { genreList, currentItem, updateSelectedItem } = props;

    useEffect(() => {
        updateSelectedItem(currentItem)
    }, [])

    
    
    return (
        <ul className="list-container">
          {genreList.map((item) => (
        <li
          key={item.id}
          className={item.is_active ? 'item' : ''}
          onClick={() => updateSelectedItem(item.id)}
        >
          {item.name}
        </li>
      ))}
        </ul>
    );
  };
  
  export default GenreList;
  