import income from "../fixtures/income.json";
import editIncome from "../fixtures/editIncome.json";
import { formatDate } from "utils/utils";

declare global {
  namespace Cypress {
    interface Chainable {
      addIncome(): void;
      editIncome(): void;
    }
  }
}

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
