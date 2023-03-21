import React from 'react';
import { useAppSelector } from '../../store/hooks';

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
            <p>{text}</p>
        </>
    );
};

export default TotalFound;