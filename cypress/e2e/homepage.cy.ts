describe("Homepage", () => {
  it("should navigate to login page", () => {
    cy.visit("/").contains("Log in").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/login");
    });
  });
});
