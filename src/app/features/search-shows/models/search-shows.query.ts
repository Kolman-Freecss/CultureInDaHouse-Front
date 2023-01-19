import { Status } from "src/app/shared/enums";
import { Category } from "../../models";

export interface SearchShowsQuery {
    name: string;
    category: Category | null;
    onSaleDate: Date | null;
    status: Status;
}
