import { test, expect } from "@playwright/test";
import { contactData } from "../../test-data/contact.data";
import { ContactPage } from "../../pages/contacts.page";

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
    // Arrange
    const firstNameError = "First name is required";
    const lastNameError = "Last name is required";
    const emailError = "Email is required";
    const subjectError = "Subject is required";
    const messageError = "Message is required";

    // Act

    await contactPage.sendButton.click();

    // Asserts
    await expect(contactPage.firstNameErrorLocator).toHaveText(firstNameError);
    await expect(contactPage.lastNameErrorLocator).toHaveText(lastNameError);
    await expect(contactPage.emailErrorLocator).toHaveText(emailError);
    await expect(contactPage.subjectErrorLocator).toHaveText(subjectError);
    await expect(contactPage.messageErrorLocator).toHaveText(messageError);

    await expect(contactPage.confirmationMessage).toBeHidden();
  });
});
