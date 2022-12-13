import { formatDate } from "utils/utils";

declare global {
  namespace Cypress {
    interface Chainable {
      addInvestment(): void;
      editInvestment(): void;
    }
  }
}

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
