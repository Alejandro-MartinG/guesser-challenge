# Rinkeby faucet

This project is a minimal API which do test transactions between two eth wallets through a Infura node.

## Installation & Configuration

1. Clone the repository

2. Create the file `.env` copying `.env.example` and filling it properly
    * If you are not familiar with eth wallets install [Metamask](https://metamask.io/) plugin and create two wallets
    * Send some Rinkeby money to your wallet: https://faucet.rinkeby.io/

3. Start the server:
    * Locally
        * Install dependencies: `npm install`
        * Run local server: `npm start`
    * Docker: `docker up 5500:5500 -d example`

## Usage

Send a "send money" request to the server:

```bash
WALLET_ADDRESS="0x0000000000000000000000000000000000000000"

curl -XPOST localhost:5500/send-money --data "address=${WALLET_ADDRESS}"
```
