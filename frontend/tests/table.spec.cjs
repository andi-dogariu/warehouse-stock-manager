// @ts-check
const { test, expect } = require('@playwright/test');

// test table renders details remove edit buttons
test('Table renders details button', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('details-1')).toBeVisible();
});

test('Table renders edit button', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('edit-1')).toBeVisible();
});

test('Table renders remove button', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('remove-1')).toBeVisible();
});

test('Table renders add button', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('add')).toBeVisible();
});

test('Details button navigates to details page', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('[data-testid=details-1]');
    await expect(page.url()).toBe('http://localhost:5173/product/1');
});

test('Edit button navigates to edit page', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('[data-testid=edit-1]');
    await expect(page.url()).toBe('http://localhost:5173/product/edit/1');
});

test('Edit operation visible', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('[data-testid=edit-2]');
    await page.getByTestId('make').fill('Test');
    await page.click('[data-testid=save]');
    await expect(page.getByText('Test')).toBeVisible();
});

test('Remove button removes row', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.on('dialog', dialog => dialog.accept());
    await page.click('[data-testid=remove-1]');
    //click ok on the confirmation dialog
    await expect(page.getByTestId('row-1')).toHaveCount(0);
});

test('Add button adds row', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.click('[data-testid=add]');
    await page.getByTestId('make').fill('Test');
    await page.getByTestId('model').fill('Test');
    await page.getByTestId('price').fill('1');
    await page.getByTestId('stock').fill('1');
    await page.click('[data-testid=save]');
    await expect(page.getByTestId('row-8')).toHaveCount(1);
});


