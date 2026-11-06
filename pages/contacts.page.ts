import { Locator, Page } from "@playwright/test";

export interface ContactFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export class ContactPage {
  readonly sendButton: Locator;
  readonly confirmationMessage: Locator;
  readonly inputs: Record<keyof ContactFormData, Locator>;
  readonly errors: Record<keyof ContactFormData, Locator>;

  constructor(private page: Page) {
    this.sendButton = this.page.getByTestId("contact-submit");

    // Role "alert" is shared with the field validation messages, so the success
    // message is located by its semantic class instead.
    this.confirmationMessage = this.page.locator(".alert-success");

    this.inputs = {
      firstName: this.page.getByTestId("first-name"),
      lastName: this.page.getByTestId("last-name"),
      email: this.page.getByTestId("email"),
      subject: this.page.getByTestId("subject"),
      message: this.page.getByTestId("message"),
    };

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
      await this.inputs.firstName.fill(data.firstName);
    if (data.lastName !== undefined)
      await this.inputs.lastName.fill(data.lastName);
    if (data.email !== undefined) await this.inputs.email.fill(data.email);
    if (data.subject !== undefined)
      await this.inputs.subject.selectOption(data.subject);
    if (data.message !== undefined)
      await this.inputs.message.fill(data.message);
  }

  // Empties a single field. The subject is a <select>, which cannot be cleared the way a
  // text input can, so its placeholder option is selected instead.
  async clearField(field: keyof ContactFormData): Promise<void> {
    const input = this.inputs[field];
    await input.click();
    await input.press("ControlOrMeta+a");
    await input.press("Backspace");
    await input.blur();
  }
}
