import { Performance } from "../../models";

export class CreatePerformanceCommand {
    constructor(performance: Performance) {
        this.performance = performance;        
    }

    performance: Performance;
}
