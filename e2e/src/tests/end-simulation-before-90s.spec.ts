import test, { expect } from '@playwright/test';

test.setTimeout(60000);

test('should show finish button after starting simulation', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="start-button"]');
  await expect(page.getByRole('button', { name: /finish/i })).toBeVisible();
});

test('should end simulation before 90 seconds and show restart button', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="start-button"]');

  await expect(page.locator('[data-testid="total-goals"]')).toHaveText('Total Goals: 1', {
    timeout: 15000,
  });
  await page.click('[data-testid="finish-button"]');
  await expect(page.getByRole('button', { name: /restart/i })).toBeVisible();
});

test('should not increment goals after finishing early', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="start-button"]');

  await expect(page.locator('[data-testid="total-goals"]')).toHaveText('Total Goals: 1', {
    timeout: 15000,
  });
  const totalGoals = await page.locator('[data-testid="total-goals"]').innerText();
  await page.click('[data-testid="finish-button"]');
  await page.waitForTimeout(12000);
  await expect(page.locator('[data-testid="total-goals"]')).toHaveText(totalGoals);
});

test('should show progress bar and total goals after finishing early', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="start-button"]');
  await expect(page.locator('[data-testid="total-goals"]')).toHaveText('Total Goals: 1', {
    timeout: 15000,
  });
  await page.click('[data-testid="finish-button"]');

  await expect(page.getByRole('button', { name: /restart/i })).toBeVisible({
    timeout: 5000,
  });
  await expect(page.locator('[data-testid="total-goals"]')).toBeVisible();
  await expect(page.locator('[data-testid="progress"]')).toBeVisible();
});
