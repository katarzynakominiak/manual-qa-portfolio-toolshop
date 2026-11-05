import { Locator, Page } from "@playwright/test";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactPage {
  firstNameInput: Locator;
  lastNameInput: Locator;
  emailInput: Locator;
  subjectInput: Locator;
  messageInput: Locator;
  sendButton: Locator;
  confirmationMessage: Locator;
  firstNameErrorLocator: Locator;
  lastNameErrorLocator: Locator;
  emailErrorLocator: Locator;
  subjectErrorLocator: Locator;
  messageErrorLocator: Locator;

  constructor(private page: Page) {
    this.firstNameInput = this.page.getByTestId("first-name");
    this.lastNameInput = this.page.getByTestId("last-name");
    this.emailInput = this.page.getByTestId("email");
    this.subjectInput = this.page.getByTestId("subject");
    this.messageInput = this.page.getByTestId("message");
    this.sendButton = this.page.getByTestId("contact-submit");
    this.confirmationMessage = this.page.locator(".alert-success");
    // Role "alert" is shared with the field validation messages, so the success
    // message is located by its semantic class instead.

    this.firstNameErrorLocator = this.page.getByTestId("first-name-error");
    this.lastNameErrorLocator = this.page.getByTestId("last-name-error");
    this.emailErrorLocator = this.page.getByTestId("email-error");
    this.subjectErrorLocator = this.page.getByTestId("subject-error");
    this.messageErrorLocator = this.page.getByTestId("message-error");
  }
  async fillForm(data: ContactFormData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.subjectInput.selectOption(data.subject);
    await this.messageInput.fill(data.message);
  }
}
