import { test, expect } from '@playwright/test';

test.describe('Portfolio Website E2E Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the local homepage
    await page.goto('/');
  });

  test('should display English contents by default and toggle language correctly', async ({ page }) => {
    // Check initial language is English
    const bio = page.locator('#overview p.body-large');
    await expect(bio).toContainText('I build intelligent systems');

    // Verify langToggle button aria-label for EN is '한국어로 전환'
    const toggleBtn = page.locator('button[aria-label="한국어로 전환"]');
    await expect(toggleBtn).toBeVisible();

    // Click the toggle button to switch to Korean
    await toggleBtn.click();

    // Check that it transitioned to Korean
    const toggleBtnKo = page.locator('button[aria-label="Switch to English"]');
    await expect(toggleBtnKo).toBeVisible();
    await expect(bio).toContainText('AI 연구와 프로덕션 엔지니어링의 교차점에서');

    // Click the toggle button again to switch back to English
    await toggleBtnKo.click();

    // Check that it transitioned back to English
    await expect(toggleBtn).toBeVisible();
    await expect(bio).toContainText('I build intelligent systems');
  });

  test('should handle project modal visibility, escape close, and focus trap', async ({ page }) => {
    // Locate the first project card
    const firstProjectCard = page.locator('div[role="button"][aria-label*="프로젝트 상세 보기"]').first();
    await expect(firstProjectCard).toBeVisible();

    // Click to open the modal
    await firstProjectCard.click();

    // Assert modal is open
    const modal = page.locator('div[role="dialog"][aria-modal="true"]');
    await expect(modal).toBeVisible();

    // Assert that the Close button (x) is focused automatically
    const closeBtn = modal.locator('button:has-text("×")');
    await expect(closeBtn).toBeFocused();

    // Find all focusable elements inside the modal
    // In our case: [closeBtn, githubLink]
    const githubLink = modal.locator('a:has-text("GitHub")').first();
    await expect(githubLink).toBeVisible();

    // Press Tab: Focus should move to the GitHub link
    await page.keyboard.press('Tab');
    await expect(githubLink).toBeFocused();

    // Press Tab again: Focus should wrap back to the Close button
    await page.keyboard.press('Tab');
    await expect(closeBtn).toBeFocused();

    // Press Shift+Tab: Focus should wrap to the GitHub link
    await page.keyboard.press('Shift+Tab');
    await expect(githubLink).toBeFocused();

    // Press Shift+Tab again: Focus should wrap back to the Close button
    await page.keyboard.press('Shift+Tab');
    await expect(closeBtn).toBeFocused();

    // Press Escape to close the modal
    await page.keyboard.press('Escape');

    // Assert modal is closed
    await expect(modal).not.toBeVisible();

    // Assert focus is restored to the first project card
    await expect(firstProjectCard).toBeFocused();
  });

  test('should open and close the email contact form modal', async ({ page }) => {
    // Locate the Email Contact Card in Contact section
    const emailCard = page.locator('div[role="button"]').filter({ hasText: 'Email' });
    await expect(emailCard).toBeVisible();

    // Click the email card to open the form modal
    await emailCard.click();

    // Assert the email form card or form is visible
    const emailForm = page.locator('form');
    await expect(emailForm).toBeVisible();

    // Locate the Close button in the form
    const closeFormBtn = page.locator('button[aria-label="Close form"]');
    await expect(closeFormBtn).toBeVisible();

    // Click to close the form
    await closeFormBtn.click();

    // Assert the email form is closed
    await expect(emailForm).not.toBeVisible();
  });

});
