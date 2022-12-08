describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should navigate to recovery password and go back to login page", () => {
    cy.contains("Forgot Password?").click();

    cy.url().should("include", "/reset-password");

    cy.contains("Back to Login").click();

    cy.url().should("include", "/login");
  });

  it("should navigate to register and go back to login", () => {
    cy.contains("Create new account").click();

    cy.url().should("include", "/register");

    cy.contains("Go to login").click();

    cy.url().should("include", "/login");
  });
});

const asModule = {};
export default asModule;
