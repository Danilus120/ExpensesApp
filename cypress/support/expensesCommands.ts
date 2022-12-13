import expense from "../fixtures/expense.json";
import editExpense from "../fixtures/editExpense.json";
import { formatDate } from "utils/utils";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      addExpense(): void;
      editExpense(): void;
      deleteExpense(): void;
    }
  }
}

Cypress.Commands.add("addExpense", () => {
  const { date, category, shopName, price, description } = expense;

  cy.get("#date").type(date);

  cy.get("#category")
    .contains("Car and transport")
    .get("#react-select-2-input")
    .type(category);

  cy.get("#shopName").type(shopName);

  cy.get("#value").type(price), cy.get("#description").type(description);

  cy.contains("Submit").click();
});

Cypress.Commands.add("editExpense", () => {
  const {
    date: editDate,
    category: editCategory,
    shopName: editShopName,
    price: editPrice,
    description: editDescription,
  } = editExpense;

  cy.get("#date").type(formatDate(new Date().getTime()));

  cy.get("#category").get("#react-select-2-input").type(editCategory);

  cy.get("#shopName").clear().type(editShopName);

  cy.get("#value").clear().type(editPrice);

  cy.get("#description").clear().type(editDescription);

  cy.contains("Submit").click();
});

Cypress.Commands.add("deleteExpense", () => {
  cy.get('[data-cy="delete-record-btn"]').click();

  cy.get("button").contains("OK").click();
});
