module.exports = {
    //Is login screen is displayed
    "Login into App": function(browser){
        
        browser
            .url("http://localhost:3000/")
            .pause(3000)
            .useXpath()
            .maximizeWindow()

    },
    "Verify login page buttons": function(browser){
        browser
        .waitForElementVisible('//*[@id="login-username"]',"username is displayed")
        .waitForElementVisible('//*[@id="login-password"]',"Password is displayed")
        .waitForElementVisible('//*[text()="Login"]',"Login button is displayed")
        .waitForElementVisible('//*[text()="Sign Up"]',"Sign Up Link is displayed")
    },
    "Enter valid username and password": function(browser){
        browser
        .click('//input[@id="login-username"]')
        .setValue('//*[@id="login-username"]', "h")
        .pause(2000)
        .click('//*[@id="login-password"]')
        .setValue('//*[@id="login-password"]', "h")
        .click('//*[@id="login"]')
        .pause(2000)
        .waitForElementVisible('//*[text()="Configure Budgets"]')
    }
}