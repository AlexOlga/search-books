import {URL, API_KEY } from "./constants";

/* https://www.googleapis.com/books/v1/volumes?q=search+terms
GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey */
export function  getData (  query: string ) {
    fetch(`${URL}${query}:keyes&key=${API_KEY}`)
    .then(async (response) => await response.json())
    .then((data:JSON) => {
        console.log(data);
    })
    .catch((err) => {console.log(err)});
};

