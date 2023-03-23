import React from 'react';
import { type TBook } from '../../baseTypes';
import './book.scss';

const BookCard = (book: TBook) => {
    // const { book, onClick } = props;
    const categorie = (book.volumeInfo.mainCategory !== undefined) ? book.volumeInfo.mainCategory : (book.volumeInfo.categories !== undefined) ? book.volumeInfo.categories[0] : '';
    return (
        <div className="book-card" >
            <img className="book-card__img" src={book.volumeInfo.imageLinks?.thumbnail} alt="book cover" />
            <h3 className="book-card__title">{book.volumeInfo.title}</h3>
            <div className="text-content">
                <p className="book-card__category text-block">
                    {categorie}
                </p>
                <p className="book-card__authors text-block">
                    {book.volumeInfo.authors?.join(', ')}
                </p>
            </div>
        </div>
    )
}

export default BookCard;