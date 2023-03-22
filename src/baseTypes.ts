export type TBook = {
    id: string,    
    volumeInfo: {
        title?: string,
        subtitle?: string,
        authors?: string[],
        categories?: string[],
        mainCategory?:string,
        description?: string,
        imageLinks?: {
            small: string,
            thumbnail: string,
            medium:string
        }
    }
}
export type TBooks = {
    kind: string,
    totalItems: number,
    items: TBooks[]
}
export type TResponse = {
    kind: string,
    totalItems: number,
    items: TBook[],
}

