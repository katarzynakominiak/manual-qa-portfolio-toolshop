import { test, expect } from "@playwright/test";
import { filtersData } from "../../test-data/filters.data";
import { FiltersComponent } from "../../pages/filters.page";

test.describe("filters", () => {
  let filtersComponent: FiltersComponent;

  test.beforeEach(async ({ page }) => {
    filtersComponent = new FiltersComponent(page);
    await page.goto("/");
  });

  test("filtering successfully by one category", async () => {
    // Arrange
    const productName = filtersData.valid.productName;
    const differentCategoryProductName =
      filtersData.valid.differentCategoryProductName;

    // Assert the product is listed before filtering, so its absence afterwards proves
    // the filter removed it rather than it never having been on this page.
    await expect(
      filtersComponent.product(differentCategoryProductName),
    ).toHaveCount(1);

    // Act
    await filtersComponent.category("Hammer").check();

    // Assert
    await expect(filtersComponent.product(productName)).toHaveCount(1);
    await expect(
      filtersComponent.product(differentCategoryProductName),
    ).toHaveCount(0);
  });
  test("filtering by category and brand shows only products matching both", async () => {
    // Arrange filter by category and confirm the product is listed before narrowing further
    const productName = filtersData.valid.productName;
    const differentBrandProductName =
      filtersData.valid.differentBrandProductName;

    // Act
    await filtersComponent.category("Hammer").check();

    // Assert
    await expect(
      filtersComponent.product(differentBrandProductName),
    ).toHaveCount(1);

    // Act
    await filtersComponent.brand("ForgeFlex Tools").check();

    // Assert
    await expect(filtersComponent.product(productName)).toHaveCount(1);
    await expect(
      filtersComponent.product(differentBrandProductName),
    ).toHaveCount(0);
  });
  // --- add near the top of tests/ui/filters.spec.ts, above test.describe ---

  // Requires at least one price: every() returns true for an empty array, so a broken
  // price locator would otherwise produce a passing assertion.
  const allWithinRange = (values: number[], min: number, max: number) =>
    values.length > 0 && values.every((v) => v >= min && v <= max);

  // --- add as a new test inside the existing describe block ---

  test("filtering by price range shows only products within the selected range", async () => {
    // Arrange
    const initialMin = await filtersComponent.getSliderValue(
      filtersComponent.sliderMin,
    );

    // Act
    await filtersComponent.moveSlider(filtersComponent.sliderMin, "PageUp", 3);

    // Assert
    // Both the range and the list are read on every attempt, so a moment where the
    // slider has moved but the list has not yet re-filtered simply retries.
    await expect
      .poll(async () => {
        const min = await filtersComponent.getSliderValue(
          filtersComponent.sliderMin,
        );
        const max = await filtersComponent.getSliderValue(
          filtersComponent.sliderMax,
        );
        return allWithinRange(await filtersComponent.getPrices(), min, max);
      })
      .toBe(true);

    // The handle must actually have moved, otherwise the range above is the full scale
    // and every product would satisfy it.
    const min = await filtersComponent.getSliderValue(
      filtersComponent.sliderMin,
    );
    expect(min).toBeGreaterThan(initialMin);
  });
});
