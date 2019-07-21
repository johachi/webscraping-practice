const rp = require("request-promise");
const $ = require("cheerio");

const { getNameAndBirthday } = require("./src/potusParse");

const url =
  "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States";

rp(url)
  .then(html => {
    const presidents = $("big > a", html);
    const wikiUrls = [];

    for (let i = 0; i < presidents.length; ++i) {
      const href = presidents[i].attribs.href;
      wikiUrls.push(href);
    }

    return Promise.all(
      wikiUrls.map(url => {
        return getNameAndBirthday(url);
      })
    );
  })
  .then(presidents => {
    presidents.forEach(president => {
      console.log(president);
    });
  })
  .catch(err => {
    console.error(err);
  });
