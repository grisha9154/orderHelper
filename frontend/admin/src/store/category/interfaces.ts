export interface Category {
  id: number;
  title: string;
  description: string;
}

export interface CreateCategoryPayload {
  title: string;
  description: string;
}

export interface UpdateCategoryPayload {
  id: number;
  title: string;
  description: string;
}
