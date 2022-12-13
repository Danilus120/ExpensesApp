import { formatDate } from "utils/utils";

declare global {
  namespace Cypress {
    interface Chainable {
      updateCurrency(): void;
    }
  }
}

Cypress.Commands.add("updateCurrency", () => {
  cy.get("#currency")
    .contains("British Pound Sterling (GBP)")
    .get("#react-select-2-input")
    .type("EUR{enter}");

  cy.get("button[type=submit]").contains("Submit").click();
});
