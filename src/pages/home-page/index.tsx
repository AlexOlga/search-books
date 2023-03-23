import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeSearchValue, fetchBooks, changeFilter, resetSearch, changeSorting, changeStartIndex } from '../../store/booksSlice';
import SearchBar from '../../components/search-bar/seach-bar'
import { CATEGORIES, SORT_TYPE } from '../../constants';
import Select from '../../components/select/select';
import TotalFound from '../../components/total-found/total-found';
import BooksList from '../../components/books-list/books-list';
import Button from '../../components/button/button';

import './styles.scss';
const HomePage = () => {
  const { loading, searchValue } = useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();
  const handleSearch = () => {
    if (searchValue !== "") {
      void dispatch(fetchBooks());
    } else {
      dispatch(resetSearch());
    }
  };
  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === '') {
      dispatch(resetSearch());
    };
    dispatch(changeSearchValue(e.target.value.trim()));

  };
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'all') {
      void dispatch(fetchBooks());
    } else {
      dispatch(changeFilter(e.target.value));
    }
  }

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeSorting(e.target.value));
    void dispatch(fetchBooks());
  }

  const handleLoadMore = () => {
    dispatch(changeStartIndex());
    void dispatch(fetchBooks());
  }

  return (
    <>
      <header className='header'>
        <h1 className='title'>Search for books</h1>
        <SearchBar value={searchValue}
          changeSearch={changeSearch}
          handleSearch={handleSearch} />
        <div className='contener'>
          {(loading === false) && (<>
            <Select name={'filter'} options={CATEGORIES} labelText={'Categories'} handleSelect={handleFilter} />
            <Select name={'sorting'} options={SORT_TYPE} labelText={'Sorting by'} handleSelect={handleSorting} />
          </>)}
        </div>


      </header>
      <TotalFound />
      {(loading === false) && (
        <>
          <BooksList />
          <div className='button-contener'>
            <Button text={"Load more"} onClick={handleLoadMore} />
          </div>

        </>
      )}

    </>
  )
}
export default HomePage