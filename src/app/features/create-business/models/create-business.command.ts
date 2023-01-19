import {Business} from "../../models/business";

export class CreateBusinessCommand {
  company: Business;

  constructor(business: Business) {
    this.company = business;
  }
}
