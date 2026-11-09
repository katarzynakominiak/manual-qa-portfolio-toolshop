import { Page, Locator } from "@playwright/test";

export class FiltersComponent {
  readonly productNames: Locator;

  constructor(private page: Page) {
    // Every product card on the results list.
    this.productNames = this.page.getByTestId("product-name");
  }

  // Checkboxes are located by their visible label rather than by their data-test
  // attribute, which holds a generated database id that changes when the catalogue
  // data is reseeded.
  category(name: string): Locator {
    return this.page.getByRole("checkbox", { name });
  }
  brand(name: string): Locator {
    return this.page.getByRole("checkbox", { name });
  }

  product(name: string): Locator {
    // Exact match: product names overlap — "Claw Hammer" is contained in
    // "Claw Hammer with Fiberglass Handle" — so a substring match would be ambiguous.
    return this.productNames.filter({
      hasText: new RegExp(`^\\s*${name}\\s*$`),
    });
  }
}
