const rp = require("request-promise");
const $ = require("cheerio");

const url =
  "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States";

rp(url)
  .then(html => {
    const presidents = $("big > a", html);

    for (let i = 0; i < presidents.length; ++i) {
      console.log(presidents[i].attribs.href)
    }
  })
  .catch(err => console.error(err));
