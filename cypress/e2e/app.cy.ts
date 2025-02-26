describe("Cat Facts App", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it("should add a new fact when the 'Get New Fact' button is clicked", () => {
        cy.get("[data-testid='fact-item']", { timeout: 10000 }).should("exist")

        cy.get("[data-testid='fact-item']").then((initialFacts) => {
            const initialCount = initialFacts.length

            cy.get("[data-testid='get-new-fact-btn']").click()

            cy.get("[data-testid='fact-item']", { timeout: 10000 })
                .should("have.length.greaterThan", initialCount)

            cy.get("[data-testid='fact-item']")
                .last()
                .should("be.visible")
                .invoke("text")
                .then((text) => {
                    expect(text).to.not.be.empty;
                })
        })
    })
})