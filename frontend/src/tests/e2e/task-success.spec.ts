import { test, expect } from '@playwright/test';

// Setup: Clear localStorage before each test
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/task-manage/');
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

//   test('Test Case 2: Change task status from TODO to IN_PROGRESS to COMPLETED', async ({ page }) => {
//     await page.goto('http://localhost:3000/task-manage/');
    
//     // Create a task first
//     await page.getByTestId('add-task-button').click();
//     await page.getByTestId('task-title-input').fill('Review pull request');
//     await page.getByTestId('create-task-button').click();
    
//     // Verify initial status (TODO)
//     await expect(page.getByTestId('todo-tasks')).toHaveText('1');
//     await expect(page.getByTestId('in-progress-tasks')).toHaveText('0');
//     await expect(page.getByTestId('completed-tasks')).toHaveText('0');
    
//     // Click status toggle to change to IN_PROGRESS
//     await page.getByTestId('toggle-task-status').click();
    
//     // Verify status changed to IN_PROGRESS
//     await expect(page.getByTestId('todo-tasks')).toHaveText('0');
//     await expect(page.getByTestId('in-progress-tasks')).toHaveText('1');
//     await expect(page.getByTestId('completed-tasks')).toHaveText('0');
    
//     // Click status toggle again to change to COMPLETED
//     await page.getByTestId('toggle-task-status').click();
    
//     // Verify status changed to COMPLETED
//     await expect(page.getByTestId('todo-tasks')).toHaveText('0');
//     await expect(page.getByTestId('in-progress-tasks')).toHaveText('0');
//     await expect(page.getByTestId('completed-tasks')).toHaveText('1');
    
//     // Verify task title has strikethrough styling (completed state)
//     const taskTitle = page.getByText('Review pull request');
//     await expect(taskTitle).toHaveClass(/line-through/);
//   });

//   test('Test Case 3: Filter tasks by status and search functionality', async ({ page }) => {
//     await page.goto('http://localhost:3000/task-manage/');
    
//     // Create multiple tasks with different statuses
//     // Task 1 - TODO
//     await page.getByTestId('add-task-button').click();
//     await page.getByTestId('task-title-input').fill('Write unit tests');
//     await page.getByTestId('create-task-button').click();
    
//     // Task 2 - Will be IN_PROGRESS
//     await page.getByTestId('add-task-button').click();
//     await page.getByTestId('task-title-input').fill('Fix bug in authentication');
//     await page.getByTestId('create-task-button').click();
    
//     // Task 3 - TODO
//     await page.getByTestId('add-task-button').click();
//     await page.getByTestId('task-title-input').fill('Update dependencies');
//     await page.getByTestId('create-task-button').click();
    
//     // Verify all 3 tasks are visible
//     await expect(page.getByTestId('task-item')).toHaveCount(3);
    
//     // Change second task to IN_PROGRESS (click the second toggle button)
//     const toggleButtons = page.getByTestId('toggle-task-status');
//     await toggleButtons.nth(1).click();
    
//     // Filter by status: IN_PROGRESS
//     await page.getByTestId('status-filter').selectOption('IN_PROGRESS');
    
//     // Verify only 1 task is visible (the IN_PROGRESS one)
//     await expect(page.getByTestId('task-item')).toHaveCount(1);
//     await expect(page.getByText('Fix bug in authentication')).toBeVisible();
    
//     // Clear filter
//     await page.getByTestId('status-filter').selectOption('');
    
//     // Verify all 3 tasks are visible again
//     await expect(page.getByTestId('task-item')).toHaveCount(3);
    
//     // Test search functionality
//     await page.getByTestId('search-input').fill('bug');
    
//     // Verify only the task with "bug" in title is visible
//     await expect(page.getByTestId('task-item')).toHaveCount(1);
//     await expect(page.getByText('Fix bug in authentication')).toBeVisible();
    
//     // Clear search
//     await page.getByTestId('search-input').clear();
    
//     // Verify all tasks are visible again
//     await expect(page.getByTestId('task-item')).toHaveCount(3);
//   });

});