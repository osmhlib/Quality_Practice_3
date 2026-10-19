import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.getTitle()).toHaveText('Products');
});

test('Locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.getErrorMessage())
        .toContainText('Sorry, this user has been locked out');
});

test('Empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('', '');

    await expect(loginPage.getErrorMessage())
        .toContainText('Username is required');
});