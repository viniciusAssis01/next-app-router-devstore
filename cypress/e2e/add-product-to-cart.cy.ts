describe("add product to cart", () => {
	//criando variaveis, assim podemos usar dentro do escopo de cada teste (muito bom criar variaveis de processos q se repetem em cada teste)

	//antes de cada teste, quero que visite a home da nossa app
	beforeEach(() => {
		cy.visit("/");
	});

	it("should be able to navigate to the product page and add it to the cart", () => {
		/*para testar a adição ao carrinho, precisamos q ele navegue para uma pg de qlq dos 3 produtos 
    para isso vamos usar o get q nos permite selecionar um elemento em tela com base em um seletorHTML (igual o querySelector do js).
    no caso vamos selecionar a tag link em q o href q começa com (^="valor" - o valor tem q estar entre aspas)
    first(): como temos varias tag A, vamos selecionar apenas o 1º
    click(): clicar 
    */
		cy.get("a[href^='/product']").first().click();

		//vamos garantir q a url para a qual ele foi navegado inclua "/product"
		cy.url().should("include", "/product");
		//outra forma de fazer isso é: cy.localtion("pathname").should("include", "/product")

		//selecionar o elemento html q possui o texto:
		cy.contains("Adicionar ao carrinho").click();

		//com essa ação queremos garantir que consigamos encontrar um elemento que possui o texto...
		cy.contains("Cart 1").should("exist");
	});

	//não deve adicionar produtos duplicados na contagem do carrinho (pois é um cart por produto e ñ por quantidade)
	it("should not add count duplicated products on cart", () => {
		cy.get("a[href^='/product']").first().click();

		cy.url().should("include", "/product");
		cy.contains("Adicionar ao carrinho").click();
		cy.contains("Adicionar ao carrinho").click();

		//vamos clicar 2 vezes ao carrinho, e esperamos q o texto do cart ainda esteja em 1
		//perceça que criar testes vc tem q pensar separado do código. aqui no teste é "o que vc espera q aconteça" e no código é "o q está acontecendo"
		cy.contains("Cart 1").should("exist");
	});

	//teste: deve ser capaz de procurar um produto e adicioná -lo ao carrinho
	//perceba que um teste é isolado do outro
	it("should be able to search for a product and add it to the cart", () => {
		//buscar o elemento html... - igual o querySelector do js
		//esse tipe é para digitar alguma coisa no elemento selecionado
		//digitado algo no input selecionado, vamos dar um submit(envio) para a api: vamos selecionar o parent desse elemento (no caso o parente pai). e vamos realizar um submit

		//cy.get("input[name=q]").type("moletom").parent("form").submit();
		//substitundo o comando acima pelo que criamos:
		cy.searchByQuery("moletom");

		cy.get('a[href^="/product"]').first().click();
		cy.location("pathname").should("include", "/product");

		cy.contains("Adicionar ao carrinho").click();
		cy.contains("Cart 1").should("exist");
	});
});
