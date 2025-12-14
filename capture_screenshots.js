const { chromium } = require('playwright');
const fs = require('fs');

// Configuration
const BASE_URL = 'http://localhost:5173';

// 1. New User for Registration Flow (Randomized to avoid conflicts)
const UNIQUE_ID = Date.now();
const NEW_USER_EMAIL = `demo_${UNIQUE_ID}@test.com`;
const NEW_USER_PASS = 'password123';

// 2. Existing Admin Credentials (MUST exist in DB for Admin screenshots)
const ADMIN_EMAIL = 'simple@gmail.com'; 
const ADMIN_PASS = 'simple';

(async () => {
  console.log('📸 Starting automated screenshot capture...');
  
  if (!fs.existsSync('screenshots')){
    fs.mkdirSync('screenshots');
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 } // Start Desktop
  });
  const page = await context.newPage();

  // Helper for consistent screenshots
  const takeShot = async (name) => {
    console.log(`   Capturing: ${name}`);
    await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  };

  try {
    // ==========================================
    // PHASE 1: DESKTOP FLOW
    // ==========================================
    console.log('\n🖥️  PHASE 1: DESKTOP CAPTURE');

    // 1. Register Page
    await page.goto(`${BASE_URL}/register`);
    await page.waitForSelector('form');
    await takeShot('desktop-1-register');

    // Action: Register
    console.log(`   Action: Registering new user (${NEW_USER_EMAIL})...`);
    await page.fill('input[type="email"]', NEW_USER_EMAIL);
    await page.fill('input[type="password"]', NEW_USER_PASS);
    await page.click('button[type="submit"]');
    
    // Wait for redirect to Login (implicit or explicit)
    await page.waitForURL(`${BASE_URL}/login`, { timeout: 5000 }).catch(() => {});

    // 2. Login Page
    await page.goto(`${BASE_URL}/login`); // Ensure we are on login
    await takeShot('desktop-2-login');

    // Action: Login as New User
    console.log('   Action: Logging in...');
    await page.fill('input[type="email"]', NEW_USER_EMAIL);
    await page.fill('input[type="password"]', NEW_USER_PASS);
    await page.click('button[type="submit"]');
    await page.waitForURL(`${BASE_URL}/`);
    await page.waitForTimeout(1000); // Wait for data load

    // 3. User Dashboard
    await takeShot('desktop-3-dashboard');

    // 4. Search
    const searchInput = page.locator('input[placeholder*="Search"]');
    if (await searchInput.count() > 0) {
        await searchInput.fill('Gummy');
        await page.waitForTimeout(1000);
        await takeShot('desktop-4-search');
    }

    // 5. Profile
    await page.goto(`${BASE_URL}/profile`);
    await page.waitForTimeout(1000);
    await takeShot('desktop-5-profile');

    // Action: Logout
    console.log('   Action: Logging out...');
    const logoutBtn = page.locator('button[title="Sign Out"]');
    if (await logoutBtn.count() > 0) await logoutBtn.click();
    await page.waitForURL(`${BASE_URL}/login`);

    // Action: Login as Admin
    console.log(`   Action: Logging in as Admin (${ADMIN_EMAIL})...`);
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASS);
    await page.click('button[type="submit"]');
    await page.waitForURL(`${BASE_URL}/`);
    await page.waitForTimeout(1000);

    // 6. Admin Panel
    await page.goto(`${BASE_URL}/admin`);
    await page.waitForTimeout(1500);
    await takeShot('desktop-6-admin');

    // ==========================================
    // PHASE 2: MOBILE FLOW (Reverse Order)
    // ==========================================
    console.log('\n📱 PHASE 2: MOBILE CAPTURE');
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
    await page.reload(); // Reload to trigger any media queries if needed
    await page.waitForTimeout(1000);

    // 1. Admin Panel (Mobile) - currently logged in as admin
    await takeShot('mobile-6-admin');

    // 2. Dashboard (Mobile)
    await page.goto(`${BASE_URL}/`);
    await page.waitForTimeout(1000);
    await takeShot('mobile-3-dashboard');

    // 3. Search (Mobile)
    const mobileSearch = page.locator('input[placeholder*="Search"]');
    if (await mobileSearch.count() > 0) {
        await mobileSearch.fill('Choco');
        await page.waitForTimeout(1000);
        await takeShot('mobile-4-search');
    }

    // 4. Profile (Mobile)
    await page.goto(`${BASE_URL}/profile`);
    await page.waitForTimeout(1000);
    await takeShot('mobile-5-profile');

    // Action: Logout (Mobile)
    console.log('   Action: Logging out (Mobile)...');
    const mobileLogout = page.locator('button[title="Sign Out"]');
    if (await mobileLogout.count() > 0) await mobileLogout.click();
    else await page.goto(`${BASE_URL}/login`);
    
    await page.waitForURL(`${BASE_URL}/login`);
    await page.waitForTimeout(500);

    // 5. Login (Mobile)
    await takeShot('mobile-2-login');

    // 6. Register (Mobile)
    await page.goto(`${BASE_URL}/register`);
    await page.waitForTimeout(500);
    await takeShot('mobile-1-register');

    console.log('\n✅ Success! All Desktop and Mobile screenshots saved to /screenshots folder.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: 'screenshots/error_snapshot.png' });
  } finally {
    await browser.close();
  }
})();