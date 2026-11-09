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
});
