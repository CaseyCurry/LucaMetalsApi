// TODO: unit test
const Transaction = class {
  constructor({ date, partner, description, count, price }) {
    if (!date) {
      try {
        date = new Date(date);
      } catch (error) {
        throw new Error("The date must have a value and must be a date");
      }
    }
    if (!partner || typeof partner !== "string") {
      throw new Error("The partner must have a value and must be a string");
    }
    if (!description || typeof description !== "string") {
      throw new Error("The description must have a value and must be a string");
    }
    if (!count || typeof count !== "number") {
      throw new Error("The count must have a value and must be a number");
    }
    if (!price || typeof price !== "number") {
      throw new Error("The price must have a value and must be a number");
    }
    this.date = date;
    this.partner = partner;
    this.description = description;
    this.count = count;
    this.price = price;
  }

  get totalCost() {
    return this.count * this.price;
  }
};

export { Transaction };
