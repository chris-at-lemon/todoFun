/// <reference types="cypress" />

describe("todo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000/");
  });

  it("can edit titles and badges", () => {
    // add a couple of todos
    const todo1Title = "Finish coding challenge";
    const todo1Badge1 = "@important";
    const todo1Badge2 = "@today";
    const todo2Title = "Grab a beer";
    const todo2Badge1 = "@success";
    const todo2Badge2 = "@itsFriday";

    cy.findByRole("textbox").type(`${todo1Title} ${todo1Badge1} ${todo1Badge2}{enter}`);
    cy.findByRole("textbox").type(`${todo2Title} ${todo2Badge1} ${todo2Badge2}{enter}`);

    // Enable title editing
    const firstTitleClass = todo1Title.split(" ").join("");
    const textToAdd = "now";
    const firstBadgeClass = todo1Badge1.replace("@", "") + todo1Badge2.replace("@", "");
    const badgeToAdd = "@deadline";

    // Double click and check title input focus
    cy.findByText(/finish coding challenge/i).dblclick();
    cy.get(`.${firstTitleClass}`).should("have.visible");
    cy.get(`.${firstTitleClass}`).should("have.focus");

    // Edit the title

    cy.get(`.${firstTitleClass}`).type(` ${textToAdd}{enter}`);

    // Check edit success
    cy.get(".todo-list li .titleText").first().should("have.text", `${todo1Title} ${textToAdd}`);

    // Click and check title badge input focus
    cy.findByText(/@today/i).click();
    cy.get(".editing .editInput.textInput").should("have.visible");
    cy.get(".editing .editInput.textInput").should("have.focus");

    cy.get(`.${firstBadgeClass}`).type(` ${badgeToAdd}{enter}`);

    // Check badge has appeared
    cy.get(`.${badgeToAdd.replace("@", "")}`).should("have.text", badgeToAdd);

    // Remove badge
    cy.get(`.btn-destroy-${todo1Badge1.replace("@", "")}`).click();

    // Check it's been removed
    cy.get(`.btn-destroy-${todo1Badge1.replace("@", "")}`).should("not.exist");

    // Add badge via title input
    cy.findByText(/finish coding challenge now/i).dblclick();
    const inputContents = todo1Title.replace(" ", "") + textToAdd.replace(" ", "");
    const inputClassToGet = inputContents.replace(" ", "");
    cy.get(`.${inputClassToGet}`).type("{backspace}{backspace}{backspace} @now {enter}");

    // Check new badge (@now) has appeared
    cy.get(".now").should("be.visible");

    // Set item as done
    cy.get(`.label-${todo1Title.replaceAll(" ", "")}`).click();

    // Clear item
    cy.get(".clear-completed").click();

    // Grab a beer
    cy.get(`.label-${todo2Title.replaceAll(" ", "")}`).click();
  });
});
