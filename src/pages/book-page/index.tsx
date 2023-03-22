/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { type TResponse, type TBook } from '../../baseTypes';
import { API_KEY } from '../../constants';


const BookPage = () => {
    const { bookId} = useParams();
    const [book, setBook] = useState<TBook>();
    const [isBook, setIsBook] = useState(true); 

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookId}&key=${API_KEY}`)
            .then(async (res: Response) => await res.json())
            .then((data: TResponse) => {if (data.items !== undefined) setBook(data.items[0])})
            .catch(() => { setIsBook(false) })
    }, [bookId])
    if (!isBook) return (<p> Not found</p>);

    const categorie = (book !== undefined) ? (book.volumeInfo.categories !== undefined) ? book.volumeInfo.categories.join(' ') : '' : '';
    return (
        <>
            {(book !== undefined) && (<div className="book-page" >
                <h3 className="book-page__title">{book.volumeInfo.title}</h3>
                <img className="book-page__img" src={book.volumeInfo.imageLinks?.thumbnail} alt="book cover" />
                <div className="text-contener">
                    <p className="book-page__category">
                        {categorie}
                    </p>
                    <p className="book-page__authors">
                        {book.volumeInfo.authors?.join(' ')}
                    </p>
                    <p className="book-page__description">
                        {book.volumeInfo.description}
                    </p>
                </div>
                <Link to="/" className="link-back">
                    <button> back</button>
                </Link>
            </div>)}
        </>
    )
}

export default BookPage;