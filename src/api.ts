import {URL, API_KEY } from "./constants";

/* https://www.googleapis.com/books/v1/volumes?q=search+terms
GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey 
GET https://www.googleapis.com/books/v1/volumes?q=flowers&projection=lite&key=yourAPIKey
*/
export function  getData (  query: string ) {
    fetch(`${URL}${query}:key=${API_KEY}`)
    .then(async (response) => await response.json())
    .then((data:JSON) => {
        console.log(data);
        return data;
    })
    .catch((err) => {console.log(err)});
};
//GET https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=yourAPIKey

/*
Пагинация

Вы можете разбить список томов на страницы, указав два значения в параметрах запроса:

    startIndex — позиция в коллекции, с которой следует начать. Индекс первого элемента равен 0.
    maxResults — максимальное количество возвращаемых результатов. Значение по умолчанию — 10, а максимально допустимое значение — 40. 
*/