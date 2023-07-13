export interface ICategoryRequest {
    name: string;
    path: string;
    imagePath: string;
    affiliation: boolean;
}

export interface ICategoryResponse extends ICategoryRequest {
    id: number | string;
}
