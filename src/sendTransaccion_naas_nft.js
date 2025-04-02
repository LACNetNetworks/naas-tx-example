const Web3 = require("web3");
const ethTx = require("ethereumjs-tx");
const readline = require("readline");
//https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#new-contract
async function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

const args = process.argv.slice(2);

// web3 initialization - must point to the HTTP JSON-RPC endpoint

var provider = args[0] || `http://localhost:3000`;
// var provider = args[0] || `http://146.148.73.191`;
//var provider = args[0] || 'http://35.185.112.219';

console.log("******************************************");
console.log("Using provider : " + provider);
console.log("******************************************");
var web3 = new Web3(new Web3.providers.HttpProvider(provider));

let usersContract;
web3.transactionConfirmationBlocks = 1;
// Sender address and private key
// Second acccount in dev.json genesis file
// Exclude 0x at the beginning of the private key

const addressFrom = "0x2d48B0E5468d690FB77454552B118584d09690F5";
const privKey = Buffer.from(
  "a0a2af404337c096113bc2c180df7a6636a88f8eb5da6160817f9315aaafee80",
  "hex"
);

const addressContract = "0xbD2c633E8E08cCA67bf11B4C8EbEaFDA0bc0103d";

const accountAddress = "0x0cC9Bdf94Ef7503B00D64F947a8Ec32681b54EAA";
const expiration = 1898156266;

const functionName = "store";
const typeOfData = "uint256";
//let color ="#" + ((1<<24)*Math.random() | 0).toString(16)
const valueRam = 94;
console.log("valueRam:" + valueRam);
let set = web3.eth.abi.encodeFunctionSignature("store(uint256)"); //function name to use

let valueAdd = web3.eth.abi.encodeParameters(["uint256"], [valueRam]);
let valueAddExt = web3.eth.abi.encodeParameters(
  ["address", "uint256"],
  [accountAddress, expiration]
);
//console.log("")const txData = set + value.substr(2) ;
console.log("valueAdd-" + valueAdd.substr(2));

const txData = set + valueAdd.substr(2) + valueAddExt.substr(2);
console.log("========INIT===========================");
console.log(txData);
const encodeAby = web3.utils.toHex(txData);
console.log(encodeAby);
web3.eth
  .getTransactionCount(addressFrom, "pending")
  .then((txnCount) => {
    //
    // curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x9335636955fd93cd836f4496b8a381645375ea7c","latest"],"id":1}' http://192.168.33.102:4545
    // Create the contract creation transaction object
    console.log("nonce: ", txnCount);

    var txObject = {
      nonce: txnCount,
      gasPrice: web3.utils.toHex(0),
      gasLimit: web3.utils.toHex(2612890),
      data: encodeAby,
      to: addressContract,
    };

    // Sign the transaction with the private key
    var tx = new ethTx(txObject);
    tx.sign(privKey);

    //Convert to raw transaction string
    var serializedTx = tx.serialize();
    var rawTxHex = "0x" + serializedTx.toString("hex");
    console.log("rawTxHex:" + rawTxHex);
    // log raw transaction data to the console so you can send it manually
    //console.log("Raw transaction data: " + rawTxHex);
    // but also ask you if you want to send this transaction directly using web3

    // Send the signed transaction using web3

    web3.eth
      .sendSignedTransaction(rawTxHex)
      .on("receipt", (receipt) => {
        console.log("Receipt: ", receipt);
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
    console.log("******************************************");
    console.log("Contract transaction sent, waiting for receipt.");
    console.log("******************************************");
  })
  .catch((error) => {
    console.log("Error catch: ", error.message);
  });

//transactionHash: '0x4639cce7bdf437760ecd7182e3d34482e72aef0e71606fdf9380d8c4a7bf21e6'
//blockHash: '0xedcf0d63293d4403b43c3e22ed6105ce9481f638265201243bb50585c3a1e6f6'
//blockNumber: 13747

// directo
//0xdbea06da149d227b62bd611542fb2887c9ec9775e8707b01dbaa2e619bfb8635

// anterior relay
