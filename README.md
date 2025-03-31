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