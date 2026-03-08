import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: true,
  retries: 2,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: [
    {
      command: 'npm run dev --prefix Backend',
      url: 'http://localhost:3001/api/health',
      reuseExistingServer: false,
    },
    {
      command: 'npm run dev --prefix Frontend',
      url: 'http://localhost:5173',
      reuseExistingServer: false,
    },
  ],
});
