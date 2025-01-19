import { test, expect } from '@playwright/test';
import { searchForProduct } from './utils';

const productName = 'Red Rock Deli Lime And Pepper Potato Chips 165gm';
test('has title', async ({ page }) => {
  await page.goto('https://a.co/d/i755aa7');
  await expect(page.getByTestId('productTitle')).toBeVisible();
  await expect(page.getByTestId('productTitle')).toHaveText(productName);
});

test('product appears in search results', async ({ page }) => {
  await page.goto('https://a.co/d/i755aa7');
  const asinContainer = page.getByTestId('detailBullets_feature_div').getByText("ASIN").locator("xpath=following-sibling::*");
  const asin = await asinContainer.textContent() as string;
  await searchForProduct(page, asin);
  await expect(page.getByText(productName, { exact: true })).toBeVisible();
});

test('can add product to cart', async ({ page }) => {
  await page.goto('https://a.co/d/i755aa7');
  const addToCartButton = page.getByTestId('add-to-cart-button');
  const cartCount = page.getByTestId('nav-cart-count');
  const gotoCartButton = page.getByTestId('sw-gtc');
  const cartItemCount = page.getByRole('spinbutton');
  const checkoutButton = page.getByTestId('desktop-ptc-button-celWidget').getByRole('button');

  await addToCartButton.click();
  await expect(cartCount).toHaveText('1');
  await gotoCartButton.click();
  await expect(cartItemCount).toHaveText('1');
  await checkoutButton.click();
  await expect(page).toHaveURL(/https:\/\/www\.amazon\.com\/ap\/signin.*/);
});