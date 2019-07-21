const puppeteer = require("puppeteer");
const url = "http://www.reddit.com";
const $ = require("cheerio");

puppeteer
  .launch()
  .then(browser => {
    return browser.newPage();
  })
  .then(page => {
    return page.goto(url).then(() => {
      return page.content();
    });
  })
  .then(html => {
    const headlines = $("h3", html);
    
    for (let i = 0; i < headlines.length; ++i) {
      console.log($(headlines[i]).text());
    }

    process.exit();
  })
  .catch(error => {
    console.error(error);
  });
