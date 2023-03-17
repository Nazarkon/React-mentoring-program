import './App.css';
import Counter from "./components/Counter"
import SearchInput from './components/SearchInput';
import GenreList from './components/GenreList';
import genreList from "./mock/genreData.json"

function App() {
  return (
    <div className="App">
     <Counter/>
     <SearchInput/>
     <GenreList 
        genreList={genreList}
        currentItem={'horror'}
      />
    </div>
  );
}

export default App;
