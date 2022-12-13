import { formatDate } from "utils/utils";

declare global {
  namespace Cypress {
    interface Chainable {
      findAnchorWithClick(link: string, force: boolean): void;
      checkUrl(link: string): void;
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
