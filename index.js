const app = require('express')();

var port = 5500;

app.get('/', (req, res) => {
  res.send('Welcome to my personal Faucet');
});


app.listen(port, () => console.log(`Faucet running on: http://localhost:${port}/`));