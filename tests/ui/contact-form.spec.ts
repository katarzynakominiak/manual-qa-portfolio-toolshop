import { test, expect } from "@playwright/test";
import { contactData } from "../../test-data/contact.data";
import { ContactFormData, ContactPage } from "../../pages/contacts.page";

test.describe("contact form", () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await page.goto("/contact");
  });

  test("submits successfully with valid data", async () => {
    // Arrange
    const confirmationMessage =
      "Thanks for your message! We will contact you shortly.";

    // Act
    await contactPage.fillForm(contactData.valid);
    await contactPage.sendButton.click();

    // Assert
    await expect(contactPage.confirmationMessage).toHaveText(
      confirmationMessage,
    );
  });

  test("shows a validation error for every required field when submitted empty", async () => {
    // Act
    await contactPage.sendButton.click();

    // Assert
    await expect(contactPage.errors.firstName).toHaveText(
      "First name is required",
    );
    await expect(contactPage.errors.lastName).toHaveText(
      "Last name is required",
    );
    await expect(contactPage.errors.email).toHaveText("Email is required");
    await expect(contactPage.errors.subject).toHaveText("Subject is required");
    await expect(contactPage.errors.message).toHaveText("Message is required");

    await expect(contactPage.confirmationMessage).toBeHidden();
  });
  const requiredFields: {
    field: keyof ContactFormData;
    label: string;
    errorMessage: string;
  }[] = [
    {
      field: "firstName",
      label: "first name",
      errorMessage: "First name is required",
    },
    {
      field: "lastName",
      label: "last name",
      errorMessage: "Last name is required",
    },
    { field: "email", label: "email", errorMessage: "Email is required" },
    { field: "message", label: "message", errorMessage: "Message is required" },
  ];
  // One test is generated per required field. The form is filled with valid data and the
  // field under test is then cleared, which is what a user does when they delete a value.
  // Clearing marks the field as touched, so the validation message is shown immediately
  // and the assertion does not depend on the form being re-evaluated after a click.
  for (const { field, label, errorMessage } of requiredFields) {
    test(`shows an error when the ${label} is cleared`, async () => {
      // Act
      await contactPage.fillForm(contactData.valid);
      await contactPage.clearField(field);

      // Angular switches the control from ng-valid to ng-invalid once the cleared value has
      // reached the form model. Waiting for that class guarantees the form is known to be
      // invalid before the submit is sent.
      await expect(contactPage.inputs[field]).toHaveClass(/ng-invalid/);

      await contactPage.sendButton.click();

      // Assert
      await expect(contactPage.errors[field]).toHaveText(errorMessage);
      await expect(contactPage.confirmationMessage).toBeHidden();
    });
  }
  test("rejects an email address in an invalid format", async () => {
    // Act
    await contactPage.fillForm(contactData.invalidEmail);
    await contactPage.sendButton.click();

    // Assert
    await expect(contactPage.errors.email).toHaveText("Email format is invalid");
    await expect(contactPage.confirmationMessage).toBeHidden();
  });
});
