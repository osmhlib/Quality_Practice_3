import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Known bug - problem_user cannot complete checkout', async ({ page }) => {
    test.fail(true, 'Known bug for problem_user during checkout');

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login('problem_user', 'secret_sauce');

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