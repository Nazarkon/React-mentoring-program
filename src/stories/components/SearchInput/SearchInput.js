import React, {useState} from "react"
import "./SearchInput.scss"

const SearchInput = (props) => {

    const { defaultValue , onSearch} = props;

    const [searchValue, setSearchValue] = useState(defaultValue || '')

    const handleClick = (e) => {
        e.preventDefault();
        onSearch(searchValue)
    }

    

    const element = ( 
        <form id="search-form" role="search">
        <label className="search-label">FIND YOUR MOViE</label>
            <div className="search-container">
                <input 
                  type="text"
                  className="search-input"
                  aria-label="search"
                  name="search"
                  value={searchValue}
                  onChange={event => setSearchValue(event.target.value)}
                  placeholder="What do you want to watch?"
                  />
                <button 
                    className="search-button"
                    onClick={(e) => handleClick(e)}
                    >
                    Search
                </button>
            </div>
        </form>
    )
    return element
}

export default SearchInput;