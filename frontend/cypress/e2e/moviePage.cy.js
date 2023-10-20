describe("Movie page", () => {
  it("sends a GET request with movie id to get the data", () => {
    cy.intercept({
      url: "http://localhost:4000/api/movies/1",
      method: "GET",
    }).as("getMovie");

    cy.visit("http://localhost:3000/movies/1");

    cy.wait("@getMovie").then(({ response }) => {
      expect(response.statusCode).to.equal(200);
      assert.isNotNull(response.body);
    });
  });
});
