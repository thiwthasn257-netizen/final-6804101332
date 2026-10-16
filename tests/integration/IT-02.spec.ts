import { test, expect, type Browser, type BrowserContext, type Page } from '@playwright/test';

async function driverOpenInventory(browser: Browser): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext();
  await context.addCookies([{
    name: 'session-username',
    value: 'standard_user',
    domain: 'www.saucedemo.com',
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'Lax',
  }]);
  const page = await context.newPage();
  await page.goto('https://www.saucedemo.com/inventory.html');
  return { context, page };
}

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง',
  },
}, async ({ browser }) => {
  const { context, page } = await driverOpenInventory(browser);

  try {
    await test.step('สร้าง Driver และเปิด Inventory', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
    });

    await test.step('ตรวจสอบ Inventory จริง', async () => {
      await expect(page.locator('.inventory_item')).toHaveCount(6);
    });

    await test.step('เพิ่มสินค้า 2 รายการ', async () => {
      await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' })
        .getByRole('button', { name: 'Add to cart' }).click();
      await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' })
        .getByRole('button', { name: 'Add to cart' }).click();
      await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    });

    await test.step('ตรวจสอบสินค้าใน Cart', async () => {
      await page.locator('.shopping_cart_link').click();
      await expect(page.locator('.cart_item')).toHaveCount(2);
      await expect(page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
      await expect(page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bike Light' })).toBeVisible();
    });
  } finally {
    await context.close();
  }
});
