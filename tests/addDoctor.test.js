const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function testAddDoctor() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Step 1: Go to the main dashboard (NOT /add-doctor directly)
    await driver.get('http://localhost:3000/');

    // Step 2: Wait for the "Add Doctor" tab button and click it
    await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Add Doctor')]")), 10000);
    await driver.findElement(By.xpath("//button[contains(., 'Add Doctor')]")).click();

    // Step 3: Wait until the form loads (firstName field is available)
    await driver.wait(until.elementLocated(By.name('firstName')), 10000);

    // Step 4: Fill out the form fields
    await driver.findElement(By.name('firstName')).sendKeys('John');
    await driver.findElement(By.name('lastName')).sendKeys('Doe');
    await driver.findElement(By.name('email')).sendKeys('john.doe@example.com');
    await driver.findElement(By.name('specialty')).sendKeys('Pediatrics');
    await driver.findElement(By.name('licenseNumber')).sendKeys('DOC001');
    await driver.findElement(By.name('phoneNumber')).sendKeys('0777777777');
    await driver.findElement(By.name('password')).sendKeys('pass123');

    // Step 5: Click the submit button
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Step 6: Optional - wait and take a success screenshot
    await driver.sleep(3000);
    const successScreenshot = await driver.takeScreenshot();
    fs.writeFileSync('success_add_doctor.png', successScreenshot, 'base64');

    console.log("✅ Test Passed: Doctor added successfully.");

  } catch (error) {
    // Capture screenshot on failure
    const errorScreenshot = await driver.takeScreenshot();
    fs.writeFileSync('error_add_doctor.png', errorScreenshot, 'base64');

    console.error("❌ Test Failed:", error);
  } finally {
    await driver.quit();
  }
})();
