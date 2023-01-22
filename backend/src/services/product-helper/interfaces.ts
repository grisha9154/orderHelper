export interface ReadProductResult {
    id: number;
    title: string;
    description: string;
    price: number;
    categoryId: number;
}

export interface CreateProductPayload {
    title: string;
    description: string;
    price: number;
    categoryId: number;
}

export interface UpdateProductPayload {
    id: number;
    title?: string;
    description?: string;
    price?: number;
    categoryId?: number;
}
