import { test, expect } from '@playwright/test';
import { ProductDetailsPage } from './pages/productDetailsPage';

test('has title', async ({ page }) => {
  const productPage = new ProductDetailsPage(page);
  await productPage.goToProductPage();
  await expect(productPage.productTitle).toBeVisible();
  await expect(productPage.productTitle).toHaveText(ProductDetailsPage.PRODUCT_TITLE);
});

test('product appears in search results', async ({ page }) => {
  const productPage = new ProductDetailsPage(page);
  await productPage.goToProductPage();
  const asin = await productPage.productAsin.textContent() as string;
  await productPage.searchForProduct(asin);
  await expect(page.getByText(ProductDetailsPage.PRODUCT_TITLE, { exact: true })).toBeVisible();
});

test('can add product to cart', async ({ page }) => {
  const productPage = new ProductDetailsPage(page);
  await productPage.goToProductPage();

  await productPage.addToCartButton.click();
  await expect(productPage.cartCount).toHaveText('1');
  await productPage.goToCartButton.click();
  await expect(page.getByRole('spinbutton')).toHaveText('1');
  await page.getByTestId('desktop-ptc-button-celWidget').getByRole('button').click();
  await expect(page).toHaveURL(/https:\/\/www\.amazon\.com\/ap\/signin.*/);
});
