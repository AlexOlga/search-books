import React from 'react';
import { useAppSelector } from '../../store/hooks';
// import { Link } from 'react-router-dom';
import { type TBook } from '../../baseTypes';
import BookCard from '../book-card/book-card';
import './books-list.scss';

const BooksList = () => {
 const books = useAppSelector((state) => state.books.books);
 
  return (
    <>
      <div className="books-contener">
        {books.map((item: TBook) => (
          // <Link className="link-card-page" to={`/books/${item.id}`} key={item.id}>
            <BookCard {...item}  key={item.id}/>
          // </Link>
        ))}
      </div>
    </>
  );
};

export default BooksList;