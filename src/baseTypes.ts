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

export enum Order { 
    Relevance = "relevance", 
    Newest = "newest",    
};
export enum Filter { 
    all='all', 
    art='art', 
    biography= 'biography', 
    computers= 'computers', 
    history= 'history', 
    medicine= 'medicine', 
    poetry='poetry'       
};