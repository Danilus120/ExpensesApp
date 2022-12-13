import userConfig from "cypress.env.json";
import { initialUserValues } from "@/constants/initialUserValues";

describe("User In Expenses", () => {
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

  it("should add expense", () => {
    cy.visit("/dashboard/expenses");

    cy.wait(300);

    cy.contains("Add Expense").click();

    cy.addExpense();

    cy.wait(300);
  });

  it("should edit expense", () => {
    cy.visit("/dashboard/expenses");

    cy.wait(300);

    cy.get("#edit-record-btn").click();

    cy.editExpense();

    cy.wait(500);
  });

  it("should check if there is properly result for expenses on dashboard", () => {
    cy.visit("/dashboard");

    cy.wait(300);

    cy.get('[data-cy="money-block--expenses"]').contains("690 EUR");

    cy.wait(300);
  });

  it("should delete Expense", () => {
    cy.visit("/dashboard/expenses");

    cy.deleteExpense();

    cy.wait(300);
  });

  it("should delete user folder in db at the end", () => {
    cy.callFirestore("delete", `users/${userConfig.TEST_UID}`);
  });
});
