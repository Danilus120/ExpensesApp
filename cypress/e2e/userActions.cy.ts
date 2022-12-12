import userConfig from "cypress.env.json";
import { initialUserValues } from "@/constants/initialUserValues";

describe("User", () => {
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

  it("should go to expense page", () => {
    cy.visit("/dashboard");

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

  it("should check if there is properly result on dashboard", () => {
    cy.visit("/dashboard");

    cy.wait(300);

    cy.get('[data-cy="money-block--expenses"]').should("include", "690");

    cy.wait(300);
  });

  it("should delete Expense", () => {
    cy.visit("/dashboard/expenses");

    cy.deleteExpense();

    cy.wait(300);
  });

  it("should go to income page", () => {
    cy.visit("/dashboard");

    cy.findAnchorWithClick("/dashboard/income", true);

    cy.checkUrl("/dashboard/income");
  });

  it("should add income, edit it and delete record", () => {
    cy.visit("/dashboard/income");

    cy.wait(300);

    cy.contains("Add Income").click();

    cy.addIncome();

    cy.wait(100);

    cy.editIncome();

    cy.get('[data-cy="delete-record-btn"]').click();

    cy.get("button").contains("OK").click();

    cy.wait(300);
  });

  it("should go to investments page", () => {
    cy.visit("/dashboard");

    cy.findAnchorWithClick("/dashboard/investments", true);

    cy.checkUrl("/dashboard/investments");
  });

  it("should add investment, payout, edit, rollback and delete it", () => {
    cy.visit("/dashboard/investments");

    cy.wait(300);

    cy.contains("Add Investment").click();

    cy.addInvestment();
  });

  it("should delete user folder in db at the end", () => {
    cy.callFirestore("delete", `users/${userConfig.TEST_UID}`);
  });
});

const asModule = {};
export default asModule;
