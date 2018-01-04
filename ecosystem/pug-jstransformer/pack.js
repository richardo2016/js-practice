var pug = require('pug');

// Compile a function
var fn = pug.compileFile('./index.pug', {

});

// Render the function
var html = fn();
// => '<string>of pug</string>'