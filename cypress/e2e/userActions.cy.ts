import authUser from "../fixtures/auth-user.json";

describe("User", () => {
  it("should register", () => {
    const { displayName, email, password } = authUser;
    cy.visit("/register");

    cy.get("#displayName").type(displayName);

    cy.get("#email").type(email);

    cy.get("#password").type(password);

    // cy.get('button[type="submit"]').click();

    // cy.location().should((location) => {
    //   expect(location.pathname).to.eq("/dashboard");
    // });
  });

  it("should pick his currency while hest first time on site", () => {
    cy.visit("/dashboard");

    cy.get("#react-select-3-input").type("EUR{enter}{enter}");

    // cy.wait(100);

    cy.get('a[href*="/dashboard/expenses"]').click({ force: true });

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/dashboard/expenses");
    });

    // cy.url().should('include', '/dashboard/expenses')
  });

  it("should login", () => {
    const { email, password } = authUser;
    cy.visit("/login");

    cy.get("#email").type(email);

    cy.get("#password").type(password);

    cy.get('button[type="submit"]').click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/dashboard");
    });
  });
});
