import React from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/search-bar/seach-bar'
// import {getData} from './api';
import { CATEGORIES, SORT_TYPE } from './constants';
import Select from './components/select/select';
import {changeSearchValue, fetchBooks} from './store/booksSlice';


function App() {

  const { totalItems, books, loading, error, searchValue } = useAppSelector((state) => state.books );
  const dispatch = useAppDispatch();
 
  const handleSearch = () => {
    if (searchValue !== "") {
      dispatch(fetchBooks());    

    }
  };
  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchValue(e.target.value.trim()));  
  };
  const handleFilter=()=>{
    console.log('filter');
  }
  const handleSorting=()=>{
    console.log('sorting');
  }
  return (
    <div className="App">
      <h1>Search for books</h1>
      <SearchBar value={searchValue}
        changeSearch={changeSearch}
        handleSearch={handleSearch} />
         <Select name={'filter'} options={CATEGORIES} labelText={'Categories'} handleSelect={handleFilter}/>
         <Select name={'sorting'} options={SORT_TYPE} labelText={'Sorting by'} handleSelect={handleSorting}/>
    </div>
  )
}

export default App


