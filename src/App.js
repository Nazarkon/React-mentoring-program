import './App.css';
import Counter from "./components/Counter"
import SearchInput from './components/SearchInput';
import GenreList from './components/GenreList';
import genreList from "./mock/genreData.json"
import { useState } from 'react';

function App() {
  const [genreListItems, updateGenreList] = useState(genreList)

  const updateGenreListItems = () => {
    console.log('Some update if needed')
  }
  return (
    <div className="App">
     <Counter
     defaultValue={2}
     />
     <SearchInput
     defaultValue="Search something"
     />
     <GenreList 
        genreList={genreListItems}
        currentItem={'horror'}
        updateList={updateGenreListItems}
      />
    </div>
  );
}

export default App;
