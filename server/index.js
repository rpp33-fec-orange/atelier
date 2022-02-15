const express = require('express');
const axios = require('axios');
const config = require('../client/dist/config.js');
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.get('/product', function (req, res) {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products', { headers: { 'Authorization': config.TOKEN } })
    .then(success => {
      console.log('api axios GET success: ', success.data);
      res.send(success.data);
    })
    .catch(error => {
      console.log('api axios GET error')
      res.end();
    })
});

app.post('/search', function (req, res) {
  let keyword = req.body.keyword;
  console.log('searched: ', keyword);
  //apiRequest(keyword);
});

let port = 2000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});