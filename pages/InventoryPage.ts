import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('title');
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
    }

    getTitle() {
        return this.pageTitle;
    }

    async addProductToCart(productName: string) {
        const product = this.page
            .getByTestId('inventory-item')
            .filter({ hasText: productName });

        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    getCartBadge() {
        return this.cartBadge;
    }

    async openCart() {
        await this.cartLink.click();
    }
}