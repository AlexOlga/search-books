import React from 'react';
import { useAppSelector } from '../../store/hooks';
import './total-found.scss'

const TotalFound = () => {
    const totalItems = useAppSelector((state) => state.books.totalItems);
    let text: string;
    switch (totalItems) {
        case 0:
            text = 'Not Found'
            break
        case null:
            text = ''
            break
        default:
            text = `Found ${totalItems} results`
            break
    }

    return (
        <>
            <p className='subtitle'>{text}</p>
        </>
    );
};

export default TotalFound;