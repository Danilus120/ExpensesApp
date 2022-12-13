import { formatDate } from "utils/utils";
import reminderData from "../fixtures/reminder.json";
import editReminderData from "../fixtures/editReminder.json";

declare global {
  namespace Cypress {
    interface Chainable {
      addReminder(): void;
      confirmReminderPopup(): void;
      editReminder(): void;
      deleteReminder(): void;
    }
  }
}

Cypress.Commands.add("addReminder", () => {
  const { title, value, color, recursive } = reminderData;

  cy.contains("Add Reminder").click();

  cy.get("#date").type(formatDate(new Date().getTime()));

  cy.get("#title").type(title);

  cy.get("#value").type(value);

  cy.get("#react-select-2-input").type(color);

  cy.get("#react-select-3-input").type(recursive);

  cy.contains("Submit").click();
});

Cypress.Commands.add("confirmReminderPopup", () => {
  cy.contains("Are you payed for it already?").should("be.visible");

  cy.contains("Add expense").click();

  cy.wait(1000);
});

Cypress.Commands.add("editReminder", () => {
  const { title: editTitle, value: editValue } = reminderData;

  cy.contains("Bill#1").click();

  cy.get("#title").clear().type(editTitle);

  cy.get("#value").clear().type(editValue);

  cy.contains("Submit").click();
});

Cypress.Commands.add("deleteReminder", () => {
  const { title: editTitle } = reminderData;
  cy.contains(editTitle).click();

  cy.contains("Delete Record").click();
});
