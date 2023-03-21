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
            smallThumbnail: string,
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


