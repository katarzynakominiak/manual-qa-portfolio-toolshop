import { Page, Locator } from "@playwright/test";

export class SortComponent {
  readonly productPrices: Locator;
  readonly sortSelect: Locator;

  constructor(private page: Page) {
    this.productPrices = this.page.getByTestId("product-price");
    this.sortSelect = this.page.getByTestId("sort");
  }
  async getPrices(): Promise<number[]> {
    const texts = await this.productPrices.allTextContents();
    return texts.map((t) => parseFloat(t.replace(/[^0-9.]/g, "")));
  }
}
