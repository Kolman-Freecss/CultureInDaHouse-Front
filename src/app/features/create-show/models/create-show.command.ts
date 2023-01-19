import { Show } from "../../models";

export class CreateShowCommand {
    constructor(show: Show) {
        this.show = show;
        this.show.onSaleDate = new Date();
    }

    show: Show;
}
