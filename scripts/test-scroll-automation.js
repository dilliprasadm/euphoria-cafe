const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runTest() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // 1. Initial State (Frame 0 / Frame 1)
  await page.waitForSelector('#scroll-video-prototype');
  await new Promise(r => setTimeout(r, 1000));
  
  const frameTop = await page.evaluate(() => {
    return document.querySelector('.text-brand-caramel.font-bold')?.textContent?.trim();
  });
  console.log('1. Initial frame indicator at top:', frameTop);
  await page.screenshot({ path: path.join(__dirname, '..', 'test_1_top.png') });

  // 2. Scroll 600px down with mouse wheel
  console.log('Scrolling down with mouse wheel (600px)...');
  await page.mouse.wheel({ deltaY: 600 });
  await new Promise(r => setTimeout(r, 600));
  const frame2 = await page.evaluate(() => {
    return document.querySelector('.text-brand-caramel.font-bold')?.textContent?.trim();
  });
  console.log('2. Frame indicator after 600px scroll:', frame2);
  await page.screenshot({ path: path.join(__dirname, '..', 'test_2_scroll_600px.png') });

  // 3. Scroll to 50%
  console.log('Scrolling down further to ~50% progress...');
  await page.mouse.wheel({ deltaY: 1000 });
  await new Promise(r => setTimeout(r, 600));
  const frame3 = await page.evaluate(() => {
    return document.querySelector('.text-brand-caramel.font-bold')?.textContent?.trim();
  });
  console.log('3. Frame indicator at ~50%:', frame3);
  await page.screenshot({ path: path.join(__dirname, '..', 'test_3_scroll_mid.png') });

  // 4. Scroll to near end (Frame ~115)
  console.log('Scrolling down to near final frame...');
  await page.mouse.wheel({ deltaY: 1000 });
  await new Promise(r => setTimeout(r, 600));
  const frame4 = await page.evaluate(() => {
    return document.querySelector('.text-brand-caramel.font-bold')?.textContent?.trim();
  });
  console.log('4. Frame indicator near end:', frame4);
  await page.screenshot({ path: path.join(__dirname, '..', 'test_4_scroll_end.png') });

  // 5. Scroll past pin into Menu Realm
  console.log('Scrolling past pinned sequence into Menu Realm...');
  await page.mouse.wheel({ deltaY: 1500 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '..', 'test_5_menu_realm.png') });
  console.log('5. Scrolled past pin into Menu Realm.');

  // 6. Reverse scroll backwards
  console.log('Scrolling in reverse (upwards)...');
  await page.mouse.wheel({ deltaY: -1800 });
  await new Promise(r => setTimeout(r, 600));
  const frame6 = await page.evaluate(() => {
    return document.querySelector('.text-brand-caramel.font-bold')?.textContent?.trim();
  });
  console.log('6. Frame indicator after reverse scroll:', frame6);
  await page.screenshot({ path: path.join(__dirname, '..', 'test_6_reverse.png') });

  await browser.close();
  console.log('Test completed successfully!');
}

runTest().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
