import { test, expect } from "@playwright/test";
import { searchData } from "../test-data/search.data";
import { SearchComponent } from "../pages/search.page";

test.describe("search function", () => {
  let searchComponent: SearchComponent;
  test.beforeEach(async ({ page }) => {
    searchComponent = new SearchComponent(page);
    await page.goto("/");
  });

  test("search successfully with valid data", async () => {
    // Arrange
    const productName = searchData.valid.productName;
    const expectedCaption = `Searched for: ${productName}`;
    const expectedCountMessage = `1 product found for '${productName}'`;

    // Act
    await searchComponent.searchInput.fill(productName);
    await searchComponent.searchButton.click();
    // Assert
    await expect(searchComponent.productName).toHaveText([productName]);
    await expect(searchComponent.searchCaption).toHaveText(expectedCaption);
    await expect(searchComponent.searchResults).toHaveText(
      expectedCountMessage,
    );

    // The count assumes exactly one product matches this name. The environment is shared
    // with other testers, so this may need updating if the catalogue changes.
  });
});
