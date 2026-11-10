import { Page, Locator } from "@playwright/test";
import { readPrices } from "../utils/prices";

export class SortComponent {
  readonly productPrices: Locator;
  readonly sortSelect: Locator;

  constructor(private page: Page) {
    this.productPrices = this.page.getByTestId("product-price");
    this.sortSelect = this.page.getByTestId("sort");
  }

  async getPrices(): Promise<number[]> {
    return readPrices(this.productPrices);
  }
}
