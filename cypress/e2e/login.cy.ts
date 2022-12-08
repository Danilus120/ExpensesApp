import { describe } from "mocha";

describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should navigate to recovery password and go back to login page", () => {
    cy.contains("Forgot Password?").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/reset-password");
    });

    cy.contains("Back to Login").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/login");
    });
  });

  it("should navigate to register and go back to login", () => {
    cy.contains("Create new account").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/register");
    });

    cy.contains("Go to login").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/login");
    });
  });
});
