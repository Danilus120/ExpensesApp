import userConfig from "cypress.env.json";
import { initialUserValues } from "@/constants/initialUserValues";

describe("User In Income", () => {
  it("should login and have unique db folder", () => {
    cy.login();
    cy.callFirestore("set", `users/${userConfig.TEST_UID}`, initialUserValues);
  });

  it("should pick his currency while he is first time on site", () => {
    cy.visit("/dashboard");

    cy.wait(300);

    cy.updateCurrency();

    cy.findAnchorWithClick("/dashboard/expenses", true);

    cy.checkUrl("/dashboard/expenses");
  });

  it("should add income", () => {
    cy.visit("/dashboard/income");

    cy.wait(300);

    cy.contains("Add Income").click();

    cy.addIncome();

    cy.wait(300);
  });

  it("should edit income", () => {
    cy.visit("/dashboard/income");

    cy.wait(300);

    cy.editIncome();

    cy.wait(500);
  });

  it("should check if there is properly result for income in dashboard", () => {
    cy.visit("/dashboard");

    cy.wait(300);

    cy.get('[data-cy="money-block--income"]').contains("2000 EUR");

    cy.wait(300);
  });

  it("should delete income", () => {
    cy.visit("/dashboard/income");

    cy.wait(300);

    cy.get('[data-cy="delete-record-btn"]').click();

    cy.get("button").contains("OK").click();

    cy.wait(300);
  });

  it("should delete user folder in db at the end", () => {
    cy.callFirestore("delete", `users/${userConfig.TEST_UID}`);
  });
});

const asModule = {};
export default asModule;
