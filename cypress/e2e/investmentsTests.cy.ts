import { initialUserValues } from "@/constants/initialUserValues";

describe("User In Investments", () => {
  it("should login and have unique db folder", () => {
    cy.login();
    cy.callFirestore(
      "set",
      `users/${process.env.NEXT_PUBLIC_TEST_ID}`,
      initialUserValues
    );
  });

  it("should pick his currency while he is first time on site", () => {
    cy.visit("/dashboard");

    cy.wait(300);

    cy.updateCurrency();

    cy.findAnchorWithClick("/dashboard/expenses", true);

    cy.checkUrl("/dashboard/expenses");
  });

  it("should add investment", () => {
    cy.visit("/dashboard/investments");

    cy.wait(300);

    cy.contains("Add Investment").click();

    cy.addInvestment();

    cy.wait(300);
  });

  it("should payout investment", () => {
    cy.visit("/dashboard/investments");

    cy.wait(3000);

    cy.get("#payout-record-btn").click();

    cy.wait(2000);
  });

  it("should edit investment", () => {
    cy.visit("/dashboard/investments");

    cy.wait(300);

    cy.editInvestment();

    cy.wait(300);
  });

  it("should check if there is properly result for investment in dashboard", () => {
    cy.visit("/dashboard");

    cy.wait(5000);

    cy.get('[data-cy="money-block--investments"]').contains("1000 EUR");

    cy.wait(2000);
  });

  it("should rollback investment", () => {
    cy.visit("/dashboard/investments");

    cy.wait(300);

    cy.get("#rollback-record-btn").click();

    cy.wait(1000);
  });

  it("should delete investment", () => {
    cy.visit("/dashboard/investments");

    cy.wait(300);

    cy.contains("Delete").click();

    cy.wait(300);
  });

  it("should delete user folder in db at the end", () => {
    cy.callFirestore("delete", `users/${process.env.NEXT_PUBLIC_TEST_ID}`);
  });
});
