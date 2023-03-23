import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeSearchValue, fetchBooks, changeFilter, resetSearch, changeSorting, changeStartIndex } from '../../store/booksSlice';
import SearchBar from '../../components/search-bar/seach-bar'
import { CATEGORIES, SORT_TYPE } from '../../constants';
import Select from '../../components/select/select';
import TotalFound from '../../components/total-found/total-found';
import BooksList from '../../components/books-list/books-list';
import Button from '../../components/button/button';

import './styles.scss';
import Loading from '../../components/loading/loading';
const HomePage = () => {
  const { loading, searchValue, error, order, filter, books, startIndex, isLoadmore } = useAppSelector((state) => state.books);
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
    dispatch(changeFilter(e.target.value));
  }

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeSorting(e.target.value));
  }

  const handleLoadMore = () => {
    dispatch(changeStartIndex());
  }
  useEffect(() => {
    if (searchValue !== '') void dispatch(fetchBooks());
  }, [order, filter, startIndex])
  return (
    <>
      <header className='header'>
        <h1 className='title'>Search for books</h1>
        <SearchBar value={searchValue}
          changeSearch={changeSearch}
          handleSearch={handleSearch} />
        <div className='contener'>
          <Select name={'filter'} value={filter} options={CATEGORIES} labelText={'Categories'} handleSelect={handleFilter} />
          <Select name={'sorting'} value={order} options={SORT_TYPE} labelText={'Sorting by'} handleSelect={handleSorting} />
        </div>
      </header>
      {(loading === true) && <Loading />}
      {(error !== null) && <h2>{error}</h2>}
      {(loading === false) && (
        <>
          <TotalFound />
          {(books.length !== 0) && <BooksList />}
          {isLoadmore && (<div className='button-contener'>
            <Button text={"Load more"} onClick={handleLoadMore} />
          </div>
          )}
        </>
      )}

    </>
  )

}
export default HomePage