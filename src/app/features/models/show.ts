import { Status } from "src/app/shared/enums";
import { Category } from "./category";

export interface Show {
    id: number;
    category: Category;
    categoryId: number | null;
    name: string;
    description: string;
    image: string;
    price: number;
    duration: number;
    capacity: number;
    onSaleDate: Date;
    status: Status
}