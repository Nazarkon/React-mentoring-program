import React, { useEffect, useState } from "react";
import "./GenreList.scss"

const GenreList = (props) => {

  const { genreList, currentItem, updateGenreList } = props;

  const [selectedID, setSelectedId] = useState("");

  useEffect(() => {
    setSelectedId(currentItem)
  }, [])


  const handleItemClick = (id) => {
    setSelectedId(id)
    updateGenreList()
  }
    
    
    return (
        <ul className="list-container">
          {genreList.map((item) => (
          <li
            key={item.id}
            className={item.id === selectedID ? 'item-light' : ''}
            onClick={() => handleItemClick(item.id)}
          >
            {item.name}
          </li>
      ))}
        </ul>
    );
  };
  
  export default GenreList;
  