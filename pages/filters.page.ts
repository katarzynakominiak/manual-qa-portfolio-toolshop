import { Page, Locator } from "@playwright/test";
import { readPrices } from "../utils/prices";

export class FiltersComponent {
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sliderMin: Locator;
  readonly sliderMax: Locator;

  constructor(private page: Page) {
    this.productNames = this.page.getByTestId("product-name");
    this.productPrices = this.page.getByTestId("product-price");

    // The price range control is an ngx-slider. Both handles carry the same
    // aria-label ("ngx-slider") and an empty aria-labelledby, so they cannot be told
    // apart by role and name. The library's own pointer classes identify them instead.
    this.sliderMin = this.page.locator(".ngx-slider-pointer-min");
    this.sliderMax = this.page.locator(".ngx-slider-pointer-max");
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

  // Product cards matching a given name, anchored to the whole text: product names
  // overlap, so "Claw Hammer" would otherwise also match
  // "Claw Hammer with Fiberglass Handle".
  product(name: string): Locator {
    return this.productNames.filter({
      hasText: new RegExp(`^\\s*${name}\\s*$`),
    });
  }

  async getPrices(): Promise<number[]> {
    return readPrices(this.productPrices);
  }

  // The current position of a slider handle, as the component reports it.
  async getSliderValue(handle: Locator): Promise<number> {
    return Number(await handle.getAttribute("aria-valuenow"));
  }

  // Moves a slider handle with the keyboard. Arrow keys move one unit per press,
  // PageUp and PageDown move twenty.
  async moveSlider(
    handle: Locator,
    key: "ArrowLeft" | "ArrowRight" | "PageUp" | "PageDown",
    presses: number,
  ): Promise<void> {
    await handle.click();
    for (let i = 0; i < presses; i++) {
      await handle.press(key);
      // The catalogue is re-filtered after each change. Pressing again before that
      // completes leaves the list behind the slider, so each press is given time to
      // be applied — a person moving the slider never presses this fast.
      await this.page.waitForTimeout(300);
    }
  }
}
