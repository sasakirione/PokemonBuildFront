describe('ログインせずにいける部分', function () {
    it('TOPページ', () => {
        cy.visit('/')
        cy.get('[data-test-id="top-card-first-title"]').should('be.visible')
        // cy.get('[data-test-id="button-add-pokemon-in-build"]').click()
    });

});
