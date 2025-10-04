import { test, expect } from '@playwright/test';

test('morning shows 3 insights within 60s (TTFI)', async ({ page }) => {
  const start = Date.now();
  await page.goto('/morning');
  await expect(page.getByText('Твои 3 пункта на утро')).toBeVisible();
  await expect(page.getByText('Микропривычка')).toBeVisible();
  await expect(page.getByText('Рефрейм')).toBeVisible();
  await expect(page.getByText('Мировой штрих')).toBeVisible();
  expect(Date.now() - start).toBeLessThan(60000);
});
