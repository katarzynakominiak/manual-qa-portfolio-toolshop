import { Locator } from "@playwright/test";

/**
 * Reads every price matched by the given locator and returns them as numbers.
 * Prices are rendered with a currency symbol, so everything but digits and the
 * decimal point is stripped before parsing.
 */
export async function readPrices(priceLocator: Locator): Promise<number[]> {
  const texts = await priceLocator.allTextContents();
  return texts.map((text) => parseFloat(text.replace(/[^0-9.]/g, "")));
}
