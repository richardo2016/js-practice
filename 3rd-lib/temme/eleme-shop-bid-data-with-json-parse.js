const fs = require('fs')
const temmePack = require('temme')
const temme = temmePack.default
const {defineFilter} = temmePack

function try_parse_json () {
  var json = this.toString()
  if (json) {
    try {
      /* dangerous so you must catch it */
      json = eval("json = " + json)
    } catch (e) {
    }
  }
  // console.log('json', typeof json, json)

  return json
}
// you can define 'try_parse_json' as global filter in this process,
// or just provie one-time filter in object which as 3rd paramater of `temme`
//
defineFilter('try_parse_json', try_parse_json)
const html = fs.readFileSync('./eleme-shop-data.html', 'utf8');
const selector = fs.readFileSync('./eleme-shop-bid-info-with-json-parse-by-js.draw.temme', 'utf8');

let result = temme(html, selector)
fs.writeFileSync(
  './data/eleme-shop-bid-info-with-json-parse-by-js.local-test.json',
  JSON.stringify(result, null, 2),
  'utf8'
);