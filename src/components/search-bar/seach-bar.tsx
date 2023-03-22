import React from 'react'
import Button from '../button/button';
import './search-bar.scss'

type SearchBarProps = {
    value: string;
    changeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
  };

const SearchBar = (props: SearchBarProps ) => {
    const { value, changeSearch, handleSearch } = props;


  const isEnter = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
        console.log('enter');
        handleSearch();
    }
  } 
  return (
    <>
      <div className="searchform cf">
        <input
          type="search"
          placeholder="What will we read?"
          value={value}
          onChange={changeSearch}         
          onKeyPress={isEnter}
        />
        <Button text="Search" onClick={handleSearch}/>
        
      </div>
    </>
  )
}

export default SearchBar
