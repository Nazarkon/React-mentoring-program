import React, { useEffect, useState } from "react";
import "./GenreList.scss"

const GenreList = (props) => {

    const { genreList, currentItem } = props;



    useEffect(() => {
      updateSelectedItem(currentItem)
    }, [])

    const [items, updateItems] = useState([])



  const updateSelectedItem = (id) => {
      const updatedItems = genreList.map((item) => {
          if (item.id === id) {
            return { ...item, is_active: true };
          }
          return { ...item, is_active: false };
        });
        updateItems(updatedItems)
  }
    
    
    return (
        <ul className="list-container">
          {items.map((item) => (
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
  