var express = require('express');
var app = express();

app.listen(9527, function () {
  app.use(express.static('.'));
});
console.log('server is running on localhost port 3000.');
