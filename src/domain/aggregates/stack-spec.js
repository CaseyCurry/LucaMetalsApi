import { expect } from "chai";
import { Stack } from "./stack";
import { Transaction } from "../entities/transaction";

describe("stack suite", () => {
  describe("when a stack is created", () => {
    let stack;

    beforeEach(() => {
      stack = new Stack({
        _rev: "123",
        id: "456",
        tenantId: "789",
        name: "copper",
        purchases: [
          new Transaction({
            date: new Date(),
            partner: "Cousin Johnny",
            description: "scrap pipes",
            count: 10,
            price: 1
          }),
          new Transaction({
            date: new Date(),
            partner: "Cousin Johnny",
            description: "scrap pipes",
            count: 10,
            price: 2
          })
        ]
      });
    });

    it("should calculate the total count", () => {
      expect(stack.totalCount).to.equal(20);
    });

    it("should calculate total cost", () => {
      expect(stack.totalCost).to.equal(30);
    });

    it("should calculate average price per ounce", () => {
      expect(stack.averageCostPerOunce).to.equal(1.5);
    });
  });
});
