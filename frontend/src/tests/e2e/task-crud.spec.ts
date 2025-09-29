import { Priority } from '@/domain/enums/priority';
import { test, expect } from '@playwright/test';

test.describe('Task CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app and ensure clean state
    await page.goto('/');
    // Clear localStorage to start fresh (simulates new user session)
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should create a new task successfully', async ({ page }) => {
    // Act: Click add button to open modal
    await page.getByTestId('add-task-button').click();

    // Fill form
    await page.getByTestId('task-title-input').fill('Buy groceries');
    await page.getByTestId('task-description-input').fill('Milk, eggs, bread');
    await page.getByTestId('task-priority-select').selectOption(Priority.HIGH);
    await page.getByTestId('task-due-date-input').fill('2025-10-01'); // Tomorrow relative to current date

    // Submit
    await page.getByTestId('create-task-button').click();

    // Assert: Modal closes, task appears in list with correct details
    await expect(page.getByTestId('task-item')).toHaveCount(1);
    const taskElement = page.getByTestId('task-item').first();
    await expect(taskElement.getByText('Buy groceries')).toBeVisible();
    await expect(taskElement.getByText('Milk, eggs, bread')).toBeVisible();
    await expect(taskElement.getByText('HIGH')).toBeVisible({ exact: true });
    await expect(taskElement.locator('[data-testid="toggle-task-status"]')).toBeVisible(); // Default TODO circle icon
  });

  test('should update task status by toggling', async ({ page }) => {
    // Arrange: Create a task first
    await page.getByTestId('add-task-button').click();
    await page.getByTestId('task-title-input').fill('Test update');
    await page.getByTestId('create-task-button').click();

    // Act: Toggle status (TODO -> IN_PROGRESS)
    await page.getByTestId('toggle-task-status').click();

    // Assert: Status icon changes to in-progress (yellow circle)
    const taskElement = page.getByTestId('task-item').first();
    const statusIcon = taskElement.locator('[data-testid="toggle-task-status"] > *');
    await expect(statusIcon).toHaveAttribute('fill', 'current'); // Filled circle for IN_PROGRESS
    await expect(statusIcon).toHaveCSS('color', 'rgb(202, 138, 4)'); // Yellow for in-progress

    // Act: Toggle again (IN_PROGRESS -> COMPLETED)
    await page.getByTestId('toggle-task-status').click();

    // Assert: Status icon changes to completed (green check)
    await expect(statusIcon.locator('svg')).toHaveAttribute('data-testid', 'check-circle'); // Assuming icon has test ID if added
    await expect(taskElement.getByText('Test update')).toHaveClass(/line-through/); // Strike-through for completed
  });

  test('should delete a task successfully', async ({ page }) => {
    // Arrange: Create a task
    await page.getByTestId('add-task-button').click();
    await page.getByTestId('task-title-input').fill('Delete me');
    await page.getByTestId('create-task-button').click();

    // Act: Click delete button
    await page.getByTestId('delete-task-button').click();

    // Assert: Task list is empty, no confirmation dialog (assuming direct delete)
    await expect(page.locator('[data-testid="no-tasks-message"]')).toBeVisible();
    await expect(page.getByTestId('task-item')).toHaveCount(0);
  });
});