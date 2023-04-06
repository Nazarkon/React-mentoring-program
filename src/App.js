import Counter from "./stories/components/Counter/Counter"
import SearchInput from './stories/components/SearchInput/SearchInput';
import GenreList from './stories/components/GenreList/GenreList';
import genreList from "./mock/genreData.json"
import "@fontsource/montserrat";
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
