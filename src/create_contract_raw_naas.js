const Web3 = require('web3')
const ethTx = require('ethereumjs-tx')
const readline = require('readline');


async function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

const args = process.argv.slice(2);

// web3 initialization - must point to the HTTP JSON-RPC endpoint
//Open-Protest
var provider = args[0] || 'http://localhost:8080';
//var provider = args[0] || 'http://localhost:9001';


console.log("******************************************");
console.log("Using provider : " + provider);
console.log("******************************************");
var web3 = new Web3(new Web3.providers.HttpProvider(provider))
web3.transactionConfirmationBlocks = 1;
// Sender address and private key
const addressFrom = "0x2d48B0E5468d690FB77454552B118584d09690F5";
const privKey = Buffer.from(
  "a0a2af404337c096113bc2c180df7a6636a88f8eb5da6160817f9315aaafee80",
  "hex"
);
//node  tessera01
const nodeAddress = "0x0a68f7da3cf23176d6ae60828de2a03a2863b3e7";

console.log("addressFrom:" + addressFrom)
const expiration = 1898156266;
let valueAdd= web3.eth.abi.encodeParameters(
["address","uint256"],
  [nodeAddress,expiration]);

console.log("valueAdd-" + valueAdd.substr(2));


// hexadecimal encoded compiled contract code


const usersContractCompile = require('../scripts/compile');
console.log("bytecode")
console.log(usersContractCompile.evm.bytecode.object)
//bytecode = '0x'+contractData + valueAdd.substr(2)

//bytecode = '0x'+contractData
const bytecode = '0x'+usersContractCompile.evm.bytecode.object + valueAdd.substr(2)
console.log("bytecode add")
console.log(bytecode);
// Get the address transaction count in order to specify the correct nonce
console.log("from:",addressFrom)
web3.eth.getTransactionCount(addressFrom, "pending").then((txnCount) => {
  //6 160 375
  //5 612 890
  //350 000 000

  // Create the contract creation transaction object
  console.log( 'nonce: ' + txnCount);
  var txObject = {
     nonce: web3.utils.toHex(txnCount),
     gasPrice: web3.utils.toHex(0),
     gasLimit: web3.utils.toHex(612890),
     data: bytecode
  };

  // Sign the transaction with the private key
  var tx = new ethTx(txObject);
  tx.sign(privKey)

  //Convert to raw transaction string
  var serializedTx = tx.serialize();
  console.log("rawTxHex")
  var rawTxHex = '0x' + serializedTx.toString('hex');

  // log raw transaction data to the console so you can send it manually
  //console.log("Raw transaction data: " + rawTxHex);

  // but also ask you if you want to send this transaction directly using web3
  (async() => {
    const ans = await askQuestion("******************************************\n\
Do you want to send the signed contract creation transaction now ? (Y/N):");
    if("y" == ans || "Y" == ans){
      // Send the signed transaction using web3
      
      web3.eth.sendSignedTransaction(rawTxHex)
        .on('receipt', receipt => { console.log('Receipt: ', receipt); })
        .catch(error => { console.log('Error: ', error.message); });
      console.log("******************************************");
      console.log("Contract transaction sent, waiting for receipt.");
      console.log("******************************************");
    }else{
      console.log("******************************************");
      console.log("You can for instance send this transaction manually with the following command:");
      console.log("curl -X POST --data '{\"jsonrpc\":\"2.0\",\"method\":\"eth_sendRawTransaction\",\"params\":[\"" + rawTxHex + "\"],\"id\":1}'", provider);
    }
  })();

})
.catch(error => { console.log('Error: ', error.message); });
//https://blockscout.openprotestnet.lac-net.net/address/0xa061330B5053fDCa11Ca013d2D9B23cE317EB11F
//relayhub = 0xB9e9C5C528C266f2A1C7Eeec1975595232C8E475
//contractAddress: '0xa061330B5053fDCa11Ca013d2D9B23cE317EB11F',
//transactionHash: '0xd15d17ba35f5a0f627ef8c42c985a66f863396bf7661fbe81ad272fcd1a52c2c'
//blockHash: '0x90346f7f19982c80f952c21f9dd6bdb9a648be1bb922357f200c09ce7324cee8'
// curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["","latest"],"id":1}' http://34.132.228.174