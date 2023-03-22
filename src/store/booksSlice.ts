import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type TResponse, type TBook } from "../baseTypes";
import { API_KEY } from "../constants";
enum Order { 
    Relevance = "relevance", 
    Newest = "newest",    
};
type TBooksState = {
    searchValue: string,
    books: TBook[],
    totalItems: number | null,
    order: Order,
    loading: boolean | null,
    error: Error | null;
};

const initialState: TBooksState = {
    books: [],
    totalItems: null,
    searchValue: '',
    order: Order.Relevance,
    loading: null,
    error: null,

}
export const fetchBooks = createAsyncThunk<TResponse, undefined, { rejectValue: string; state: { books: TBooksState } }>('books/fetchBooks', async function (_, { getState }) {
    const searchValue = getState().books.searchValue;
    const order=getState().books.order;    
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&orderby=${order}&maxResults=30&key=${API_KEY}`); 
    const data = await response.json();
    return data;
});

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        changeSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        changeSorting(state, action) { 
            state.order=action.payload;
        },
        changeFilter(state, action) {
            state.books = state.books.filter((book: TBook) => {
                if (book.volumeInfo.categories !== undefined) {
                    const categories = book.volumeInfo.categories.map((item) => item.toLowerCase());
                    return categories.includes(action.payload.toLowerCase());
                } else return false

            });
            state.totalItems = state.books.length;
        },
        resetSearch(state) {
            state.loading = null;
            state.books=[];
            state.totalItems=null;
            state.error=null;
        },
        addMoreBooks() { }
    },
    extraReducers: (bilder) => {
        bilder.addCase(fetchBooks.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        bilder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.loading = false;
            state.books = action.payload.items;
            state.totalItems = action.payload.totalItems;
            console.log('state.totalItems ', state.totalItems);
            console.log('books', state.books);

        });
        bilder.addCase(fetchBooks.rejected, (state) => {
            state.loading = false;
            state.books = [];
            state.totalItems = null;
        });
    },
});
export const {
    changeSearchValue,
    changeSorting,
    changeFilter,
    addMoreBooks,
    resetSearch,
} = booksSlice.actions;
export default booksSlice.reducer;