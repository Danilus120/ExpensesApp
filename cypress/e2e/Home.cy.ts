describe("HomePage", () => {
  it("should navigate to login page", () => {
    cy.visit("/").contains("Log in").click();

    cy.url().should("include", "/login");
  });
});

const asModule = {};
export default asModule;
