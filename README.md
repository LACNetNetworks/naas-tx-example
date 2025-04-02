# Client NAAS

## Overview

Send transaction to NAAS api using web3.

## Installation

### 1️ Clone the Repository

```sh
git clone https://github.com/LACNetNetworks/naas-tx-example.git
cd naas-tx-example
```

### 2️ Install Dependencies

```sh
npm install
```

### 3️ Set Up Environment Variables

Create a `.env` file in the root directory:

```ini
AUTH_USER=myusername
AUTH_PASS=mypassword
AUTH_SERVICE=https://auth.naas.lacnet.com/login
RPC_URL=https://naas.lacnet.com/rpc
```

## Usage

```sh
node ./src/sendTransaccion_naas.js
```

## Using Hardhat

Install all hardhat plugin dependencies:

```sh
npm install --save-dev "chai@^4.2.0" "ts-node@>=8.0.0" "typechain@^8.3.0" "typescript@>=4.5.0" "@types/chai@^4.2.0" "@types/mocha@>=9.1.0" "solidity-coverage@^0.8.1" "@typechain/hardhat@^9.0.0" "@typechain/ethers-v6@^0.5.0" "hardhat-gas-reporter@^1.0.8" "@nomicfoundation/hardhat-ethers@^3.0.0" "@nomicfoundation/hardhat-verify@^2.0.0" "@nomicfoundation/hardhat-chai-matchers@^2.0.0" "@nomicfoundation/hardhat-ignition-ethers@^0.15.0" "@nomicfoundation/hardhat-network-helpers@^1.0.0" "@openzeppelin/contracts@^5.2.0"
```
