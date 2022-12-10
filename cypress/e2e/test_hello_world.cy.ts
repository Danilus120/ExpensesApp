import { initialUserValues } from "@/constants/initialUserValues";
import userConfig from "cypress.env.json";

describe("Some Test", () => {
  it("Adds document to test_hello_world collection of Firestore", () => {
    cy.login();
    cy.callFirestore(
      "set",
      `test_hello_world/${userConfig.TEST_UID}`,
      initialUserValues
    );
  });
});

const asModule = {};
export default asModule;
