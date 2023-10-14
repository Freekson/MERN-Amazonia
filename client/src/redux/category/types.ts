export interface ICategory {
  category: string;
}
export enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export interface CategoryState {
  categories: ICategory[];
  status: Status;
}
