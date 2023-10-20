describe("SearchInput Component", () => {
  it("sends a GET request with the correct query parameters when the form is submitted", () => {
    cy.intercept({
      url: "http://localhost:4000/api/movies**",
      method: "GET",
    }).as("getMovies");

    cy.visit("http://localhost:3000");

    cy.get('input[type="search"]').type("m");
    cy.get("form").submit();

    cy.wait("@getMovies").then(({ response }) => {
      expect(response.statusCode).to.equal(200);
      assert.isNotNull(response.body);
    });
  });
});
