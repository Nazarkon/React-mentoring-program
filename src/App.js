import './App.css';
import { useState } from 'react';
import Counter from "./components/Counter"
import SearchInput from './components/SearchInput';
import GenreList from './components/GenreList';

function App() {
  const [genre, updateGenre] = useState([
    { id: 'all', name: 'All', is_active: false },
    { id: 'documentary', name: 'Documentary', is_active: false },
    { id: 'comedy', name: 'Comedy', is_active: false },
    { id: 'horror', name: 'Horror', is_active: false },
    { id: 'crime', name: 'Crime', is_active: false }
  ]);

  const updateSelectedItem = (id) => {
    const updatedItems = genre.map((item) => {
        if (item.id === id) {
          return { ...item, is_active: true };
        }
        return { ...item, is_active: false };
      });
      updateGenre(updatedItems)
}
  return (
    <div className="App">
     <Counter/>
     <SearchInput/>
     <GenreList 
        genreList={genre}
        currentItem={'horror'}
        updateSelectedItem={updateSelectedItem}
      />
    </div>
  );
}

export default App;
