import Counter from "./stories/Counter"
import SearchInput from './stories/SearchInput';
import GenreList from './stories/atoms/GenreList';
import genreList from "./mock/genreData.json"
import { useState } from 'react';

function App() {
  const [genre, setSelectedGenre] = useState(genreList[0])

  const searchValue = (value) => {
    console.log(`Search value: ${value}`)
  }

  return (
    <div className="App">
     <Counter
     defaultValue={2}
     />
     <SearchInput
     defaultValue="Search something"
     onSearch={searchValue}
     />
     <GenreList 
        genreList={genreList}
        currentItem={genre}
        updateList={setSelectedGenre}
      />
    </div>
  );
}

export default App;
