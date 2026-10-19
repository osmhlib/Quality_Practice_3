import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Two products in cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');

    await expect(inventoryPage.getCartBadge()).toHaveText('2');

    await inventoryPage.openCart();

    await expect(cartPage.getCartItems()).toHaveCount(2);
});

test('Complete order', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutPage.fillInformation(
        'Hlib',
        'Osmakov',
        'LV-3601'
    );

    await checkoutPage.finishOrder();

    await expect(checkoutPage.getCompleteHeader())
        .toHaveText('Thank you for your order!');
});