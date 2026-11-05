import { Locator, Page } from "@playwright/test";
export interface ContactFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export class ContactPage {
  firstNameInput: Locator;
  lastNameInput: Locator;
  emailInput: Locator;
  subjectInput: Locator;
  messageInput: Locator;
  sendButton: Locator;
  confirmationMessage: Locator;
  errors: Record<keyof ContactFormData, Locator>;

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

    this.errors = {
      firstName: this.page.getByTestId("first-name-error"),
      lastName: this.page.getByTestId("last-name-error"),
      email: this.page.getByTestId("email-error"),
      subject: this.page.getByTestId("subject-error"),
      message: this.page.getByTestId("message-error"),
    };
  }
  // Fields are optional so that a test can deliberately omit one. A field that is
  // not present in `data` is left untouched rather than cleared.
  async fillForm(data: ContactFormData): Promise<void> {
    if (data.firstName !== undefined)
      await this.firstNameInput.fill(data.firstName);
    if (data.lastName !== undefined)
      await this.lastNameInput.fill(data.lastName);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.subject !== undefined)
      await this.subjectInput.selectOption(data.subject);
    if (data.message !== undefined) await this.messageInput.fill(data.message);
  }
}
