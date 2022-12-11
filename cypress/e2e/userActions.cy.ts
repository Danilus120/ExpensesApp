import userConfig from "cypress.env.json";
import { initialUserValues } from "@/constants/initialUserValues";

describe("User", () => {
  it("should login and have unique db folder", () => {
    cy.login();
    cy.callFirestore("set", `users/${userConfig.TEST_UID}`, initialUserValues);
  });

  it("should pick his currency while he is first time on site", () => {
    cy.visit("/dashboard");

    cy.wait(1000);

    cy.updateCurrency();

    cy.get('a[href*="/dashboard/expenses"]').click({ force: true });

    cy.checkUrl("/dashboard/expenses");
  });

  it("should go to expense page", () => {
    cy.visit("/dashboard");

    cy.get('a[href*="/dashboard/expenses"]').click();

    cy.checkUrl("/dashboard/expenses");
  });

  it("should add expense, edit it and delete record", () => {
    cy.visit("/dashboard/expenses");

    cy.wait(500);

    cy.contains("Add Expense").click();

    cy.addExpense();

    cy.wait(100);

    cy.get("#edit-record-btn").click();

    cy.editExpense();

    cy.deleteExpense();

    cy.wait(100);
  });

  it("should go to income page", () => {
    cy.visit("/dashboard");

    cy.get('a[href*="/dashboard/income"]').click();

    cy.checkUrl("/dashboard/income");
  });

  it("should add income, edit it and delete record", () => {
    cy.visit("/dashboard/income");

    cy.wait(500);

    cy.contains("Add Income").click();

    cy.addIncome();

    cy.wait(100);

    cy.editIncome();

    cy.get('[data-cy="delete-record-btn"]').click();

    cy.get("button").contains("OK").click();

    cy.wait(100);
  });

  it("should go to investments page", () => {
    cy.visit("/dashboard");

    cy.get('a[href*="/dashboard/investments"]').click();

    cy.checkUrl("/dashboard/investments");
  });

  it("should add investment, payout, edit, rollback and delete it", () => {
    cy.visit("/dashboard/investments");

    cy.wait(500);

    cy.contains("Add Investment").click();

    cy.addInvestment();
  });

  it("should delete user folder in db at the end", () => {
    cy.callFirestore("delete", `users/${userConfig.TEST_UID}`);
  });
});

const asModule = {};
export default asModule;
