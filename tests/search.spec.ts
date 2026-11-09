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
  test("displaying no results after searching with invalid data", async () => {
    // Arrange
    const randomData = searchData.valid.randomData;
    const expectedCaption = `Searched for: ${randomData}`;
    const expectedCountMessage = `0 products found for '${randomData}'`;
    const noResultsMessage = "There are no products found.";

    // Act
    await searchComponent.searchInput.fill(randomData);
    // The click can outrun the input event, so confirm the value has landed before searching.
    await expect(searchComponent.searchInput).toHaveValue(randomData);
    await searchComponent.searchButton.click();
    // Assert
    await expect(searchComponent.searchCaption).toHaveText(expectedCaption);
    await expect(searchComponent.searchResults).toHaveText(
      expectedCountMessage,
    );
    await expect(searchComponent.noResults).toHaveText(noResultsMessage);
  });

  test("does nothing when search is submitted with an empty query", async () => {
    // Arrange

    // Act
    await searchComponent.searchButton.click();

    // Assert
    await expect(searchComponent.searchCaption).toBeHidden();
  });
});
