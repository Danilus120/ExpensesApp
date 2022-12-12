import { formatDate } from "utils/utils";
import expense from "../fixtures/expense.json";
import editExpense from "../fixtures/editExpense.json";

import income from "../fixtures/income.json";
import editIncome from "../fixtures/editIncome.json";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      findAnchorWithClick(link: string, force: boolean): void;
      checkUrl(link: string): Chainable<string>;
      checkIfResultIsProperly(
        app: "expenses" | "income" | "investments",
        value: string
      ): void;
      updateCurrency(): void;
      addExpense(): void;
      editExpense(): void;
      deleteExpense(): void;
      addIncome(): void;
      editIncome(): void;
      addInvestment(): void;
      editInvestment(): void;
    }
  }
}

Cypress.Commands.add(
  "findAnchorWithClick",
  (link: string, force: boolean = false) => {
    cy.get(`a[href*="${link}"]`).click({ force: force });
  }
);

Cypress.Commands.add("checkUrl", (link: string) => {
  cy.url().should("include", link);
});

Cypress.Commands.add("updateCurrency", () => {
  cy.get("#currency")
    .contains("British Pound Sterling (GBP)")
    .get("#react-select-2-input")
    .type("EUR{enter}");

  cy.get("button[type=submit]").contains("Submit").click();
});

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

Cypress.Commands.add("addIncome", () => {
  const { date, category, title, value, description } = income;

  cy.get("#date").type(date);

  cy.get("#category").get("#react-select-2-input").type(category);

  cy.get("#title").type(title);

  cy.get("#value").type(value);

  cy.get("#description").type(description);

  cy.contains("Submit").click();
});

Cypress.Commands.add("editIncome", () => {
  const {
    date: editDate,
    category: editCategory,
    title: editTitle,
    value: editValue,
    description: editDescription,
  } = editIncome;

  cy.get("#edit-record-btn").click();

  cy.get("#date").type(formatDate(new Date().getTime()));

  cy.get("#category").get("#react-select-2-input").type(editCategory);

  cy.get("#title").clear().type(editTitle);

  cy.get("#value").clear().type(editValue);

  cy.get("#description").clear().type(editDescription);

  cy.contains("Submit").click();
});

Cypress.Commands.add("addInvestment", () => {
  cy.get("#name").get("#react-select-2-input").type("btc{enter}");

  cy.get("#value").type("1000");

  cy.contains("Submit").click();
});

Cypress.Commands.add("editInvestment", () => {
  cy.get("#edit-record-btn").click({ force: true });

  cy.get("#payoutValue").clear().type("2000");

  cy.contains("Submit").click();
});

import "./commands";
