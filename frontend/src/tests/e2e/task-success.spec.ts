import { test, expect } from '@playwright/test';

const BUCKET_NAME = process.env.VITE_BUCKET_NAME || 'error';
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ? `/${BUCKET_NAME}/index.html` : 'http://localhost:3000';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test.describe('Task Manager E2E Tests', () => {

  test('Test Case 1: Create a new task and verify it appears in the list', async ({ page }) => {
    // Verify initial state shows no tasks
    await expect(page.getByTestId('no-tasks-message')).toBeVisible();
    await expect(page.getByTestId('total-tasks')).toHaveText('0');

    // Click the Add Task button
    await page.getByTestId('add-task-button').click();

    // Fill in the task form
    await page.getByTestId('task-title-input').fill('Complete project documentation');
    await page.getByTestId('task-description-input').fill('Write comprehensive docs for the new feature');
    await page.getByTestId('task-priority-select').selectOption('HIGH');

    // Submit the form
    await page.getByTestId('create-task-button').click();

    // Verify the task appears in the list
    await expect(page.getByTestId('task-item')).toBeVisible();
    await expect(page.getByText('Complete project documentation')).toBeVisible();
    await expect(page.getByText('Write comprehensive docs for the new feature')).toBeVisible();

    // Verify stats are updated
    // await expect(page.getByTestId('total-tasks')).toHaveText('1');
    // await expect(page.getByTestId('todo-tasks')).toHaveText('1');
    // await expect(page.getByTestId('completed-tasks')).toHaveText('0');
  });
});