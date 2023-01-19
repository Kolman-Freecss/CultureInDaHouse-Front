export interface Category {
    name: string;
    description: string;
}

export class CreateCategoryCommand {
    constructor(category: Category) {
        this.category = category;
    }

    category: Category;
}
