describe("search products", () => {
	it("should be able to search for products", () => {
		/* cy.visit("/");
		cy.get("input[name=q]").type("moletom").parent("form").submit(); */
		//vamos substituir esses 2 passos acima pelo comando que criamos (pois ele replica esses 2 passos):
		cy.searchByQuery("moletom");

		cy.location("pathname").should("include", "/search");
		//garantindo q vamos ter nossa search/query params
		cy.location("search").should("include", "q=moletom");
		//garantindo q encontramos pelo menos um produto (existe)
		cy.get('a[href^="/product"]').should("exist");
	});

	it("should not be able to visit search page without a search query", () => {
		//houver uma exceção q ñ foi tratada > e tratar essa exceção
		cy.on("uncaught:exception", () => {
			//ao retornar false significa q ñ queremos tratar se acontecer algum tipo de exceção no processo desse teste
			return false;
		});

		cy.visit("/search");

		cy.location("pathname").should("equal", "/");
	});
});
