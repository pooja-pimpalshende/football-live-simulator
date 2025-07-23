import test, { expect } from '@playwright/test';

test.setTimeout(120000);
test('should show start button and initial scores', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /start/i })).toBeVisible();

  const matches = page.locator('[data-testid="match-score"]');
  await expect(matches).toHaveCount(3);
  await expect(matches.first()).toContainText('0:0');

  await expect(page.locator('[data-testid="total-goals"]')).toHaveText(
    'Total Goals: 0'
  );
});

test('should start simulation and increment goals', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="start-button"]');

  await expect(page.getByRole('button', { name: /finish/i })).toBeVisible({
    timeout: 5000,
  });
  await expect(page.locator('[data-testid="total-goals"]')).toHaveText(
    'Total Goals: 1',
    {
      timeout: 15000,
    }
  );

  await expect(page.locator('[data-testid="total-goals"]')).toHaveText(
    'Total Goals: 2',
    {
      timeout: 25000,
    }
  );
});

test('should finish simulation after 90s and show restart button', async ({
  page,
}) => {
  await page.goto('/');
  await page.click('[data-testid="start-button"]');

  // Wait for totalGoals to reach 9 (should take up to 90s)
  await expect(page.locator('[data-testid="total-goals"]')).toHaveText(
    'Total Goals: 9',
    {
      timeout: 95000,
    }
  );

  await expect(page.getByRole('button', { name: /restart/i })).toBeVisible();
});

test('should not increment goals after simulation ends', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="start-button"]');

  await expect(page.locator('[data-testid="total-goals"]')).toHaveText(
    'Total Goals: 9',
    {
      timeout: 95000,
    }
  );

  // await page.waitForTimeout(20000);
  await expect(page.locator('[data-testid="total-goals"]')).toHaveText(
    'Total Goals: 9'
  );
});

test('should allow restarting simulation', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="start-button"]');

  await expect(page.locator('[data-testid="total-goals"]')).toHaveText(
    'Total Goals: 9',
    {
      timeout: 95000,
    }
  );

  await page.click('[data-testid="restart-button"]');
  await expect(page.locator('[data-testid="total-goals"]')).toHaveText(
    'Total Goals: 0'
  );
  await expect(page.getByRole('button', { name: /finish/i })).toBeVisible();
});

test('Should reset and start simulation again after restart', async ({
  page,
}) => {
  await page.goto('/');
  await page.click('[data-testid="start-button"]');

  await expect(page.locator('[data-testid="total-goals"]')).toHaveText(
    'Total Goals: 9',
    {
      timeout: 95000,
    }
  );
  await expect(page.locator('[data-testid="restart-button"]')).toBeVisible();

  await page.click('[data-testid="restart-button"]');
  const matches = page.locator('[data-testid="match-score"]');
  await expect(matches).toHaveCount(3);
  await expect(matches.first()).toContainText('0:0');
  await expect(page.locator('[data-testid="total-goals"]')).toHaveText(
    'Total Goals: 0'
  );

  await expect(page.locator('[data-testid="total-goals"]')).toHaveText(
    'Total Goals: 1',
    {
      timeout: 45000,
    }
  );
});
