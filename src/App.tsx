import React, { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/search-bar/seach-bar'

function App() {
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearch = () => {
    if (searchValue !== "") {
      console.log('searchValue', searchValue)
    }
  };
  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trim());
  };
  return (
    <div className="App">
      <h1>Search for books</h1>
      <SearchBar value={searchValue}
        changeSearch={changeSearch}
        handleSearch={handleSearch} />
    </div>
  )
}

export default App
