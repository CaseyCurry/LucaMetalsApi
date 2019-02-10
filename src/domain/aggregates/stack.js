import { Transaction } from "../entities/transaction";

const Stack = class {
  constructor({ _rev, id, tenantId, name, purchases }) {
    // TODO: unit test
    if (!id || typeof id !== "string") {
      throw new Error("The id must have a value and must be a string");
    }
    if (!tenantId || typeof tenantId !== "string") {
      throw new Error("The tenantId must have a value and must be a string");
    }
    if (!name || typeof name !== "string") {
      throw new Error("The name must have a value and must be a string");
    }
    if (!purchases || !Array.isArray(purchases)) {
      throw new Error("The purchases must be an array");
    }
    this._rev = _rev;
    this.id = id;
    this.tenantId = tenantId;
    this.name = name;
    this.purchases = purchases.map(purchase => new Transaction(purchase));
  }

  get totalCount() {
    return this.purchases.reduce((x, y) => x + y.count, 0);
  }

  get totalCost() {
    return this.purchases.reduce((x, y) => x + y.totalCost, 0);
  }

  get averageCostPerOunce() {
    return this.totalCost / this.totalCount;
  }

  makePurchase(purchase) {
    this.purchases.push(purchase);
  }

  toJSON() {
    return {
      ...this,
      totalCount: this.totalCount,
      totalCost: this.totalCost,
      averageCostPerOunce: this.averageCostPerOunce
    };
  }
};

export { Stack };
