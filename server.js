const express = require('express');
const https = require('https');
const app = express();
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/hello', (req, res) => {
  console.log(req)
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
