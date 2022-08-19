/// <reference types="cypress" />

describe("todo App", () => {
  it("adds and shows 2 todos", () => {
    cy.visit("http://localhost:4000/");

    // add a couple of todos
    const todo1 = "Finish coding challenge";
    const todo2 = "Grab a beer";
    cy.findByRole("textbox").type(`${todo1}{enter}`);
    cy.findByRole("textbox").type(`${todo2}{enter}`);

    // Check they appear
    cy.get(".todo-list li").should("have.length", 2).first().should("have.text", todo1);
    cy.get(".todo-list li").should("have.length", 2).last().should("have.text", todo2);
  });
});
