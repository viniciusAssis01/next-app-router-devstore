/// <reference types="cypress" />

//o declare global tem q estar acima do comando criado
//"declare global" mudamos para:
declare namespace Cypress {
	//namespace Cypress {
	interface Chainable {
		searchByQuery(query: string): Chainable<void>;
	}
	//}
}

Cypress.Commands.add("searchByQuery", (query: string) => {
	//veja q o 2ºarg desse .add é um uma callback ts. ou seja, a gente poe a logica aqui
	cy.visit("/");
	cy.get("input[name=q]").type(query).parent("form").submit();

	//como ñ estamos retornando nada ele vai ser tipado como void
});
