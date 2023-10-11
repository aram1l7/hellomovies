describe("Pagination", () => {
  it('clicking "Next" button increases the page parameter by 1', () => {
    cy.visit("http://localhost:3000?search=a&page=1");

    let currentPage;
    let searchParam;

    cy.url().then((url) => {
      const searchMatch = url.match(/search=([^&]*)/);
      searchParam = searchMatch ? decodeURIComponent(searchMatch[1]) : "";

      const pageMatch = url.match(/page=(\d+)/);
      currentPage = pageMatch ? parseInt(pageMatch[1]) : 1;
    });

    cy.get('[data-testid="next"]')
      .click()
      .then(() => {
        cy.url().should(
          "include",
          `?search=${searchParam}&page=${currentPage + 1}`
        );
      });
  });

  it('clicking "Previous" button decreases the page parameter by 1', () => {
    cy.visit("http://localhost:3000?search=a&page=2");

    let currentPage;
    let searchParam;

    cy.url().then((url) => {
      const searchMatch = url.match(/search=([^&]*)/);
      searchParam = searchMatch ? decodeURIComponent(searchMatch[1]) : "";

      const pageMatch = url.match(/page=(\d+)/);
      currentPage = pageMatch ? parseInt(pageMatch[1]) : 1;
    });

    cy.get('[data-testid="previous"]')
      .click()
      .then(() => {
        cy.url().should(
          "include",
          `?search=${searchParam}&page=${currentPage - 1}`
        );
      });
  });
});
