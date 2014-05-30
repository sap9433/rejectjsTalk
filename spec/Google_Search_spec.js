'use strict';

var productToTest = 'flipkart.com'
var keyWordsList = ['Buy Shoes', 'Buy games', 'Buy Mobile', 'buy accesories'];

describe('SEO Report', function() {

    //Google.co.in specific element mapping
    var inputBoxId = "gbqfq";
    var searchBuutonId = "gbqfb";
    var resultLinkSelector = '#search #ires #rso .g .r a';


    it('Should List report on ' + keyWordsList, function() {
        console.log('\nSearch Stats for ' + productToTest + ' on ' + new Date() + '\n');
        browser.sleep(2000);
        keyWordsList.forEach(function(keyWord) {
            //Open google .
            browser.driver.get('http://www.google.co.in');

            //Type and Click 
            browser.driver.findElement(by.id(inputBoxId)).sendKeys(keyWord);
            browser.driver.findElement(by.id(searchBuutonId)).click();

            //Wait for Results to Load and takeScreenShot
            browser.sleep(2000);
            browser.takeScreenshot().then(function(image) {
                require("fs").writeFile("report/" + keyWord + '-screen.png', image, 'base64', function (err) {});
            })

            //Traverse through search result and find a particular website location.
            browser.driver.findElements(by.css(resultLinkSelector)).then(function(elementArray) {
                var found = false;
                var noOfResults = elementArray.length;
                elementArray.forEach(function(eachElement, index) {
                    eachElement.getAttribute('href').then(function(href) {

                        if (!found && href.indexOf(productToTest) > -1) {
                            console.log(productToTest + " Appers at position = " + (index + 1) + " for keyWord '" + keyWord + "'\n");
                            found = true;
                        } else if (!found && noOfResults == index + 1) {
                            console.log(productToTest + " Doesn't Appear on first page for keyWord '" + keyWord + "'\n");
                        }
                    });
                });
            });
        });
    });
});
