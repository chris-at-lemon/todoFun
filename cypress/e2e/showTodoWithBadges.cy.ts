/// <reference types="cypress" />

describe("todo App", () => {
  it("adds and shows 2 todos with badges", () => {
    cy.visit("http://localhost:4000/");

    // add a couple of todos
    const todo1Title = "Finish coding challenge";
    const todo1Badge1 = "@important";
    const todo1Badge2 = "@today";
    const todo2Title = "Grab a beer";
    const todo2Badge1 = "@success";
    const todo2Badge2 = "@itsFriday";

    cy.findByRole("textbox").type(`${todo1Title} ${todo1Badge1} ${todo1Badge2}{enter}`);
    cy.findByRole("textbox").type(`${todo2Title} ${todo2Badge1} ${todo2Badge2}{enter}`);

    // Check they appear
    cy.get(".todo-list li").should("have.length", 2);

    cy.get(".todo-list li .titleText").first().should("have.text", todo1Title);
    cy.get(".todo-list li .titleText").last().should("have.text", todo2Title);

    cy.get(".badgesContainer .badge").first().should("have.text", todo1Badge1);
    cy.get(".badgesContainer .badge").last().should("have.text", todo2Badge2);
  });
});
