require('dotenv').config();

const app = require('express')();
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const cors = require('cors');
const bodyParser = require('body-parser');

const testnet = `https://rinkeby.infura.io/tx/${process.env.INFURA_ACCESS_TOKEN}`;
const myAddress = process.env.WALLET_ADDRESS;
const privateKey = new Buffer.from(process.env.WALLET_PRIVATE_KEY, 'hex');
var web3 = new Web3(testnet);

const port = process.env.PORT || 5500;
const gPrice = web3.utils.toHex(web3.utils.toWei('3', 'gwei'));
const gLimit = web3.utils.toHex(21000);
const amountToSend = web3.utils.toHex(500000000000000000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
web3.eth.defaultAccount = process.env.WALLET_ADDRESS;

const sendMoneyto = (destinationWallet) => {
  web3.eth.getTransactionCount(myAddress, 'pending', (err, txCount) => {
    if (err) { console.log(err) };
    let rawTx = {
      nonce: web3.utils.toHex(txCount + 1),
      gasPrice: gPrice,
      gasLimit: gLimit,
      to: destinationWallet,
      value: amountToSend
    };

    let tx = new Tx(rawTx);
    tx.sign(privateKey);

    let serializedTx = tx.serialize().toString('hex');

    const trans = web3.eth.sendSignedTransaction('0x' + serializedTx).on('receipt', console.log);
    const receipt = web3.eth.getTransactionReceipt(trans).then(console.log);
    return true;
  });
};

app.get('/', (req, res) => {
  res.send('Welcome to my personal Faucet');
});

app.post('/send-money', (req, res) => {
  let result = sendMoneyto(req.body.address)
  if (result) {
    res.send({
      result: true,
      transaction: result
    });
  } else {
    res.status(500).send({
      result: false,
      error: 'Transaction failed'
    });
  }
});


app.listen(port, () => console.log(`Faucet running on: http://localhost:${port}/`));