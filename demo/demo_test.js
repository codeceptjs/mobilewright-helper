import { secret } from 'codeceptjs'

Feature('Sauce Labs Store')

// The helper relaunches the app before every test (restart: 'app'),
// no Before() hook needed

Scenario('Product catalog', ({ I }) => {
  I.waitForText('Products', 30)
  I.saveScreenshot('01-catalog.png')
  I.see('Sauce Labs Backpack')
  I.grabNumberOfVisibleElements('~store button')  // catalog items
})

Scenario('Open a product and add it to cart', ({ I }) => {
  I.waitForText('Products', 30)
  I.longPress('~longpress reset app', 2)  // reset demo app state
  I.click('Sauce Labs Backpack')
  I.waitForElement('~Add To Cart button', 15)
  I.saveScreenshot('02-product.png')
  I.click('~Add To Cart button')
  I.see('1', '~cart badge')
  I.saveElementScreenshot('~cart badge', '03-cart-badge.png')
})

Scenario('Find a field by its label + deep link', ({ I }) => {
  I.waitForText('Products', 30)
  I.amOnPage('mydemoapprn://login')
  I.waitForElement('~Username input field', 15)
  I.saveScreenshot('04-login.png')
  I.fillField('Username', 'bob@example.com')
  I.fillField('Password', secret('10203040'))
  I.click('~Login button')
  I.waitForText('Products', 15)
  I.saveScreenshot('05-after-login.png')
})

Scenario('Rotate the screen', ({ I }) => {
  I.waitForText('Products', 30)
  I.setOrientation('LANDSCAPE')
  I.seeOrientationIs('LANDSCAPE')
  I.saveScreenshot('06-landscape.png')
  I.setOrientation('PORTRAIT')
})
