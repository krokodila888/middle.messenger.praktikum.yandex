const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('./build/'));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('build', 'index.html'))
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 