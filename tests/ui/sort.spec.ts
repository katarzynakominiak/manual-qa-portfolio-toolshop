import { test, expect } from "@playwright/test";
import { SortComponent } from "../../pages/sort.page";

// Both helpers require at least two values: every() returns true for an empty array,
// so a missing or broken price locator would otherwise produce a passing assertion.
const isAscending = (values: number[]) =>
  values.length > 1 && values.every((v, i) => i === 0 || values[i - 1] <= v);

const isDescending = (values: number[]) =>
  values.length > 1 && values.every((v, i) => i === 0 || values[i - 1] >= v);

// These tests check the first page of results only. Sorting across subsequent pages
// was verified manually.
test.describe("sort", () => {
  let sortComponent: SortComponent;

  test.beforeEach(async ({ page }) => {
    sortComponent = new SortComponent(page);
    await page.goto("/");
    // Wait for the catalogue to render before interacting with the sort control.
    await expect(sortComponent.productPrices.first()).toBeVisible();
  });

  test("lists products in ascending price order", async () => {
    // Act
    await sortComponent.sortSelect.selectOption({
      label: "Price (Low - High)",
    });

    // Assert
    await expect
      .poll(async () => isAscending(await sortComponent.getPrices()))
      .toBe(true);
  });

  test("lists products in descending price order", async () => {
    // Act
    await sortComponent.sortSelect.selectOption({
      label: "Price (High - Low)",
    });

    // Assert
    await expect
      .poll(async () => isDescending(await sortComponent.getPrices()))
      .toBe(true);
  });
});
