import { deleteUser } from "firebase/auth";
import { deleteUserDB } from "lib/firebaseMethods";
import authUser from "../fixtures/auth-user.json";
import expense from "../fixtures/expense.json";
import editExpense from "../fixtures/editExpense.json";
import income from "../fixtures/income.json";
import editIncome from "../fixtures/editIncome.json";
import { auth } from "@/config/firebase.config";

describe("User", () => {
  it("should register", () => {
    const { displayName, email, password } = authUser;
    cy.visit("/register");

    cy.get("#displayName").type(displayName);

    cy.get("#email").type(email);

    cy.get("#password").type(password);

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");
  });

  it("should pick his currency while he is first time on site", () => {
    cy.visit("/dashboard");

    cy.wait(1000);

    cy.get("#currency")
      .contains("British Pound Sterling (GBP)")
      .get("#react-select-2-input")
      .type("EUR{enter}{enter}");

    cy.get('a[href*="/dashboard/expenses"]').click({ force: true });

    cy.url().should("include", "/dashboard/expenses");
  });

  it("should go to expense page", () => {
    cy.visit("/dashboard");

    cy.get('a[href*="/dashboard/expenses"]').click();

    cy.url().should("include", "/dashboard/expenses");
  });

  it("should add expense, edit it and delete record", () => {
    const { date, category, shopName, price, description } = expense;
    const {
      date: editDate,
      category: editCategory,
      shopName: editShopName,
      price: editPrice,
      description: editDescription,
    } = editExpense;

    cy.visit("/dashboard/expenses");

    cy.wait(500);

    cy.contains("Add Expense").click();

    cy.get("#date").type(date);

    cy.get("#category")
      .contains("Car and transport")
      .get("#react-select-2-input")
      .type(category);

    cy.get("#shopName").type(shopName);

    cy.get("#value").type(price), cy.get("#description").type(description);

    cy.contains("Submit").click();

    cy.wait(100);

    cy.get("#edit-record-btn").click();

    cy.get("#date").type(editDate);

    cy.get("#category").get("#react-select-3-input").type(editCategory);

    cy.get("#shopName").clear().type(editShopName);

    cy.get("#value").clear().type(price);

    cy.get("#description").clear().type(editDescription);

    cy.contains("Submit").click();

    cy.get('[data-cy="delete-record-btn"]').click();

    cy.get("button").contains("OK").click();

    cy.wait(100);
  });

  it("should go to income page", () => {
    cy.visit("/dashboard");

    cy.get('a[href*="/dashboard/income"]').click();

    cy.url().should("include", "/dashboard/income");
  });

  it("should add income, edit it and delete record", () => {
    const { date, category, title, value, description } = income;
    const {
      date: editDate,
      category: editCategory,
      title: editTitle,
      value: editValue,
      description: editDescription,
    } = editIncome;

    cy.visit("/dashboard/income");

    cy.wait(500);

    cy.contains("Add Income").click();

    cy.get("#date").type(date);

    cy.get("#category").get("#react-select-2-input").type(category);

    cy.get("#title").type(title);

    cy.get("#value").type(value);

    cy.get("#description").type(description);

    cy.contains("Submit").click();

    cy.wait(100);

    cy.get("#edit-record-btn").click();

    cy.get("#date").type(editDate);

    cy.get("#category").get("#react-select-3-input").type(editCategory);

    cy.get("#title").clear().type(editTitle);

    cy.get("#value").clear().type(editValue);

    cy.get("#description").clear().type(editDescription);

    cy.contains("Submit").click();

    cy.get('[data-cy="delete-record-btn"]').click();

    cy.get("button").contains("OK").click();

    cy.wait(100);
  });

  it("should go to investments page", () => {
    cy.visit("/dashboard");

    cy.get('a[href*="/dashboard/investments"]').click();

    cy.url().should("include", "/dashboard/investments");
  });

  it("should add investment, payout, edit, rollback and delete it", () => {
    cy.visit("/dashboard/investments");

    cy.wait(500);

    cy.contains("Add Investment").click();

    cy.get("#name").get("#react-select-2-input").type("eth{enter}");

    cy.get("#value").type("1000");

    cy.contains("Submit").click();
  });

  it("should login", () => {
    const { email, password } = authUser;
    cy.visit("/login");

    cy.get("#email").type(email);

    cy.get("#password").type(password);

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");
  });

  const user = auth.currentUser;
  deleteUser(user!);
  deleteUserDB(user?.uid!);

  cy.wait(500);
});

const asModule = {};
export default asModule;
