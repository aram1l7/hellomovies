describe("Home page", () => {
  it("Checks the headline and subheading", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="headline"]')
      .should("exist")
      .should("have.text", "Need help finding the next movie?");

    cy.get('[data-testid="subheading"]')
      .should("exist")
      .should(
        "have.html",
        "Search for your next movie through HelloMovie’s huge <br> movie library"
      );
  });

  it("Checks if the layout changes correctly after clicks", () => {
    cy.visit("http://localhost:3000?search=a&page=1");

    cy.get('[data-testid="toggle-grid"]')
      .should("exist")
      .click()
      .then(() => {
        cy.get('[data-testid="grid-list"]').should("have.class", "layout-grid");
      });

    cy.get('[data-testid="toggle-list"]')
      .should("exist")
      .click()
      .then(() => {
        cy.get('[data-testid="grid-list"]')
        .should("have.class", "layout-list");
      });
  });
});
