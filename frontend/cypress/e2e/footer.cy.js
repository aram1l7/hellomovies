describe("Footer", () => {
  it("Checks the copyright year", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="copyright"]')
      .should("exist")
      .should("include.text", `${new Date().getFullYear()}`);
  });
});
