const path = require('path');
const fs   = require('fs');
const solc = require('solc');
const chalk = require('chalk');

const storagePath = path.resolve(__dirname, '../contracts',"Storage.sol");
const baseRelayRecipientPath = path.resolve(__dirname, '../contracts',"BaseRelayRecipient.sol");
const storageSource = fs.readFileSync(storagePath,'utf8');
const baseRelayRecipientSource = fs.readFileSync(baseRelayRecipientPath,'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'Storage.sol' : {
            content: storageSource
        },
        'BaseRelayRecipient.sol' : {
            content: baseRelayRecipientSource
        }

    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

const contractCompiled = JSON.parse(solc.compile(JSON.stringify(input)));
//console.log("contractCompiled===================")
console.log(contractCompiled)
const storage =contractCompiled.contracts["Storage.sol"].Storage;
//console.log("storage===================")
//console.log(storage.evm.bytecode.object)
console.log(chalk.green(storage.evm.bytecode.object));
console.log(chalk.cyan(JSON.stringify(storage.abi)));
module.exports = contractCompiled.contracts["Storage.sol"].Storage;


