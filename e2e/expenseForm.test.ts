import { test, expect } from '@playwright/test';

test('expense form submission', async ({ page }) => {
  await page.goto('/');

  const category = 'Groceries';
  const amount = '100';
  const date = '2026-01-01';
  const description = 'E2E expense' + Date.now();
  const formattedDate = new Date(date).toLocaleDateString();

  await page.getByLabel('Category').selectOption({ label: category });
  await page.getByLabel('$ Spent').fill(amount);
  await page.getByLabel('Date').fill(date);
  await page.getByPlaceholder("What's the item for today?").fill(description);

  await Promise.all([
    page.waitForResponse(res =>
      res.url().includes('/expenses') && res.request().method() === 'POST'
    ),
    page.getByRole('button', { name: 'Add Expense' }).click()
  ]);

  const newExpenseRow = page.locator('.history-item').filter({ hasText: description });
  await expect(newExpenseRow).toBeVisible({ timeout: 10000 });
  await expect(newExpenseRow).toContainText('groceries');
  await expect(newExpenseRow).toContainText('$100');
  await expect(newExpenseRow).toContainText(formattedDate);
});

