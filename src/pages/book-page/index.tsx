/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { type TResponse, type TBook } from '../../baseTypes';
import Button from '../../components/button/button';
import { API_KEY } from '../../constants';
import './styles.scss'


const BookPage = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState<TBook>();
    const [isBook, setIsBook] = useState(true);

    useEffect(() => {
        if (bookId !== undefined) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookId}&key=${API_KEY}`)
                .then(async (res: Response) => await res.json())
                .then((data: TResponse) => { if (data.items !== undefined) setBook(data.items[0]) })
                .catch(() => { setIsBook(false) })
        }
    }, [bookId])
    if (!isBook) return (<p> Not found</p>);

    const categorie = (book !== undefined) ? (book.volumeInfo.categories !== undefined) ? book.volumeInfo.categories.join('/ ') : '' : '';
    return (
        <>
            {(book !== undefined) && (<>
                <div className="title-contener">
                    <h3 className="book-page__title">{book.volumeInfo.title}</h3>
                </div>
                <div className="content">
                    <div className="img-contener">
                        <img className="book-page__img" src={book.volumeInfo.imageLinks?.thumbnail} alt="book cover" />
                    </div>
                    <div className="text-contener">
                        <p className="book-page__category">
                            {categorie}
                        </p>
                        <p className="book-page__authors">
                            {book.volumeInfo.authors?.join(', ')}
                        </p>
                        <p className="book-page__description">
                            {book.volumeInfo.description}
                        </p>
                    </div>
                </div>
                <div className="button-back__contener">
                <Link to="/" className="link-back">               
                <Button text="Searching results" onClick={()=>{}}/>                
                </Link>
                </div>
                
            </>)}
        </>
    )
}

export default BookPage;