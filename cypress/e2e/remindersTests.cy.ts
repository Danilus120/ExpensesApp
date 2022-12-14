import { initialUserValues } from "@/constants/initialUserValues";

describe("User In Reminders", () => {
  it("should login and have unique db folder", () => {
    cy.login();
    cy.callFirestore(
      "set",
      `users/${process.env.NEXT_PUBLIC_TEST_ID}`,
      initialUserValues
    );
  });

  it("should pick his currency while he is first time on site", () => {
    cy.visit("/dashboard");

    cy.wait(300);

    cy.updateCurrency();

    cy.wait(1000);
  });

  it("should add reminder", () => {
    cy.visit("/dashboard/reminders");

    cy.wait(300);

    cy.addReminder();

    cy.wait(300);
  });

  it("should check if reminder is working", () => {
    cy.visit("/dashboard/reminders");

    cy.wait(300);

    cy.confirmReminderPopup();

    cy.visit("/dashboard");

    cy.get('[data-cy="money-block--expenses"]').contains("500 EUR");
  });

  it("should check if reminder is visible", () => {
    cy.visit("/dashboard/reminders");

    cy.wait(300);

    cy.contains("Bill#1").should("be.visible");
  });

  it("should edit reminder", () => {
    cy.visit("/dashboard/reminders");

    cy.wait(300);

    cy.editReminder();

    cy.wait(500);
  });

  it("should delete reminder", () => {
    cy.visit("/dashboard/reminders");

    cy.wait(300);

    cy.deleteReminder();

    cy.wait(300);
  });

  it("should delete user folder in db at the end", () => {
    cy.callFirestore("delete", `users/${process.env.NEXT_PUBLIC_TEST_ID}`);
  });
});
