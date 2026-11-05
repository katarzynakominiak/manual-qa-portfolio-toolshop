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
    { field: "subject", label: "subject", errorMessage: "Subject is required" },
    { field: "message", label: "message", errorMessage: "Message is required" },
  ];

  for (const { field, label, errorMessage } of requiredFields) {
    // TODO: rewrite — the current approach never focuses the omitted field, so Angular does
    // not mark it as touched and no validation message appears. The test should fill the form,
    // clear one field, and assert that the field error is shown and the submit button disabled.
    test.skip(`shows an error when the ${label} is missing`, async () => {
      // Arrange
      const incompleteData: ContactFormData = { ...contactData.valid };
      delete incompleteData[field];

      // Act
      await contactPage.fillForm(incompleteData);
      await contactPage.sendButton.click();

      // Assert
      await expect(contactPage.errors[field]).toHaveText(errorMessage);
      await expect(contactPage.confirmationMessage).toBeHidden();
    });
  }
});
