import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { type TResponse, type TBook, Order, Filter } from '../baseTypes'
import { API_KEY, BASE_URL, STEP_LOADING } from '../constants'

type TBooksState = {
  searchValue: string
  books: TBook[]
  totalItems: number | null
  order: Order
  filter: Filter
  startIndex: number
  lastIndex: number
  isLoadmore: boolean
  loading: boolean | null
  error: string | null
}

const initialState: TBooksState = {
  books: [],
  totalItems: null,
  searchValue: '',
  startIndex: 0,
  lastIndex: 0,
  isLoadmore: false,
  order: Order.Relevance,
  filter: Filter.all,
  loading: null,
  error: null,
}
export const fetchBooks = createAsyncThunk<
  TResponse,
  undefined,
  { rejectValue: string; state: { books: TBooksState } }
>('books/fetchBooks', async function (_, { getState }) {
  const searchValue = getState().books.searchValue
  const order = getState().books.order
  const startIndex = getState().books.startIndex
  const response = await fetch(
    `${BASE_URL}${searchValue}&startIndex=${startIndex}&orderby=${order}&maxResults=${STEP_LOADING}&key=${API_KEY}`
  )
  const data = await response.json()
  return data
})

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    changeSearchValue(state, action) {
      state.searchValue = action.payload
      state.startIndex = 0
      state.lastIndex = 0
    },
    changeSorting(state, action) {
      state.order = action.payload
    },
    changeFilter(state, action) {
      state.filter = action.payload
    },
    resetSearch(state) {
      state.loading = null
      state.books = []
      state.startIndex = 0
      state.lastIndex = 0
      state.totalItems = null
      state.error = null
    },
    changeStartIndex(state) {
      state.startIndex = state.lastIndex;
    },
  },
  extraReducers: (bilder) => {
    bilder.addCase(fetchBooks.pending, (state) => {
      state.loading = true
      state.error = null
    })
    bilder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false
      if (state.startIndex === 0) {
        state.books =
          action.payload.items !== undefined ? action.payload.items : []
        state.lastIndex = state.books.length
      } else {
        const nexArr =
          action.payload.items !== undefined ? action.payload.items : []
        state.books = state.books.concat(nexArr);
        state.lastIndex = state.lastIndex + nexArr.length
      }
      state.totalItems = action.payload.totalItems
      if (state.filter !== Filter.all) {
        state.books = state.books.filter((book: TBook) => {
          if (book.volumeInfo.categories !== undefined) {
            const categories = book.volumeInfo.categories.map((item) =>
              item.toLowerCase()
            )
            return categories.includes(state.filter)
          } else return false
        })
        state.totalItems = state.books.length
      }
      state.isLoadmore = state.totalItems > state.lastIndex
      // console.log('books', state.books);
    })
    bilder.addCase(fetchBooks.rejected, (state) => {
      state.loading = null
      state.books = []
      state.error = 'Data loading error'
      state.totalItems = null
      state.startIndex = 0
    })
  },
})
export const {
  changeSearchValue,
  changeSorting,
  changeFilter,
  changeStartIndex,
  resetSearch,
} = booksSlice.actions
export default booksSlice.reducer
