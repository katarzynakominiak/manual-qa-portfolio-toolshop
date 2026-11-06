import { Page, Locator } from '@playwright/test'

export class SearchComponent {
    searchInput: Locator;
    searchButton: Locator;
    searchCaption: Locator;
    searchResults: Locator;
    productName: Locator;

    constructor(private page: Page) {
        this.searchInput = this.page.getByTestId('search-query')
        this.searchButton = this.page.getByTestId('search-submit')
        this.searchCaption = this.page.getByTestId('search-caption')
        this.searchResults = this.page.getByTestId('search-result-count')
        this.productName = this.page.getByTestId('product-name')
    }
}