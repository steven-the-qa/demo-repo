import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
    readonly page: Page;
    
    // Fixed values
    static readonly PRODUCT_URL = 'https://a.co/d/i755aa7';
    static readonly PRODUCT_TITLE = 'Red Rock Deli Lime And Pepper Potato Chips 165gm';
    static readonly PRODUCT_ASIN = 'B0BXHM7Z5L';  // This is an example ASIN, replace with actual

    // Page elements
    readonly productTitle: Locator;
    readonly productSpecs: Locator;
    readonly productAsin: Locator;
    readonly addToCartButton: Locator;
    readonly cartCount: Locator;
    readonly goToCartButton: Locator;
    readonly searchBar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = this.page.getByTestId('productTitle');
        this.productSpecs = this.page.getByTestId('detailBullets_feature_div');
        this.productAsin = this.productSpecs.getByText("ASIN").locator("xpath=following-sibling::*");
        this.addToCartButton = this.page.getByTestId('add-to-cart-button');
        this.cartCount = this.page.getByTestId('nav-cart-count');
        this.goToCartButton = this.page.getByTestId('sw-gtc');
        this.searchBar = this.page.getByTestId('twotabsearchtextbox');
    }

    // Navigation methods
    async goToProductPage() {
        await this.page.goto(ProductDetailsPage.PRODUCT_URL);
    }

    // Action methods
    async searchForProduct(searchQuery: string) {
        await this.searchBar.fill(searchQuery);
        await this.searchBar.press('Enter');
        await this.page.waitForTimeout(2000);
    }
} 