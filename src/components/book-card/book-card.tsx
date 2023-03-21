import React from 'react';
import { type TBook } from '../../baseTypes';
import './book.scss';

const BookCard = (book: TBook) => {
   // const { book, onClick } = props;
   const categorie = (book.volumeInfo.mainCategory !== undefined) ? book.volumeInfo.mainCategory : (book.volumeInfo.categories!== undefined) ? book.volumeInfo.categories[0] : '';
    return (
        <div className="book-card" >
            <h3 className="book-card__title">{book.volumeInfo.title}</h3>
            <img className="book-card__img" src={book.volumeInfo.imageLinks?.smallThumbnail} alt="book cover" />
            <div className="text-contener">
                <p className="book-card__category">
                    {categorie}
                </p>
                <p className="book-card__authors">
                    {book.volumeInfo.authors?.join(' ')}
                </p>
            </div>
        </div>
    )
}

export default BookCard;