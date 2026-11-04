import { test, expect } from "@playwright/test";

test.describe("contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });
  test("submits successfully with valid data", async ({ page }) => {
    // Arrange
    const firstNameLocator = page.getByTestId("first-name");
    const lastNameLocator = page.getByTestId("last-name");
    const emailLocator = page.getByTestId("email");
    const subjectLocator = page.getByTestId("subject");
    const messageLocator = page.getByTestId("message");
    const buttonLocator = page.getByTestId("contact-submit");
    const confirmationMessageLocator = page.getByRole("alert");

    const firstName = "Morrigan";
    const lastName = "Aesland";
    const email = "test123@example.com";
    const subject = "customer-service";
    const message =
      "I would like to ask about the availability of the Claw Hammer. Could you let me know when it will be back in stock?";
    const confirmationMessage =
      "Thanks for your message! We will contact you shortly.";

    // Act

    await firstNameLocator.fill(firstName);
    await lastNameLocator.fill(lastName);
    await emailLocator.fill(email);
    await subjectLocator.selectOption(subject);
    await messageLocator.fill(message);
    await buttonLocator.click();

    // Assert
    await expect(confirmationMessageLocator).toHaveText(confirmationMessage);
  });
  test("shows a validation error for every required field when submitted empty", async ({
    page,
  }) => {
    // Arrange
    const buttonLocator = page.getByTestId("contact-submit");
    const firstNameErrorLocator = page.getByTestId("first-name-error");
    const lastNameErrorLocator = page.getByTestId("last-name-error");
    const emailErrorLocator = page.getByTestId("email-error");
    const subjectErrorLocator = page.getByTestId("subject-error");
    const messageErrorLocator = page.getByTestId("message-error");

    const firstNameError = "First name is required";
    const lastNameError = "Last name is required";
    const emailError = "Email is required";
    const subjectError = "Subject is required";
    const messageError = "Message is required";

    // Act
    await buttonLocator.click();

    // Asserts
    await expect(firstNameErrorLocator).toHaveText(firstNameError);
    await expect(lastNameErrorLocator).toHaveText(lastNameError);
    await expect(emailErrorLocator).toHaveText(emailError);
    await expect(subjectErrorLocator).toHaveText(subjectError);
    await expect(messageErrorLocator).toHaveText(messageError);

    await expect(page.getByText("Thanks for your message")).toBeHidden();
  });
});
