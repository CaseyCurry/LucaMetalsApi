// TODO: unit test
import asyncHandler from "express-async-handler";
import { Stack } from "../../domain/aggregates/stack";
import { Transaction } from "../../domain/entities/transaction";

const StackController = (app, stackRepository) => {
  return {
    register: () => {
      app.post(
        "/api/stacks",
        asyncHandler(async (request, response, next) => {
          const tenantId = request.user.tenant;
          if (request.body && tenantId != request.body.tenantId) {
            response.status(403).end();
            return;
          }
          let stack;
          try {
            stack = new Stack(request.body);
          } catch (error) {
            console.error(error);
            response.status(400).end();
            return;
          }
          await stackRepository.create(stack);
          response.status(201).end();
        })
      );
      app.post(
        "/api/stacks/:id/purchases",
        asyncHandler(async (request, response, next) => {
          let purchase;
          try {
            purchase = new Transaction(request.body);
          } catch (error) {
            console.error(error);
            response.status(400).end();
            return;
          }
          const stack = await stackRepository.getById(request.params.id);
          if (!stack) {
            response.status(404).end();
          }
          if (request.user.tenant !== stack.tenantId) {
            response.status(403).end();
            return;
          }
          stack.makePurchase(purchase);
          await stackRepository.update(stack);
          response.status(200).end();
        })
      );
      app.get(
        "/api/stacks",
        asyncHandler(async (request, response, next) => {
          const tenantId = request.user.tenant;
          const stacks = await stackRepository.getStacks(tenantId);
          response.status(200).send(stacks);
        })
      );
    }
  };
};

export { StackController };
