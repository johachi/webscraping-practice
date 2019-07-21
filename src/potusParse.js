const rp = require("request-promise");
const $ = require("cheerio");

const wikiBaseURL = "https://en.wikipedia.org";

function getNameAndBirthday(link) {
  return rp(wikiBaseURL + link)
    .then(html => {
      return {
        name: $("#firstHeading", html).text(),
        birthday: $(".bday", html).text()
      };
    })
    .catch(err => console.error(err.message));
}

module.exports = { getNameAndBirthday };
