const path = require("path");
const fs = require("fs");
const solc = require("solc");
const chalk = require("chalk");

const storagePath = path.resolve(__dirname, "../contracts", "MyNFT.sol");
const baseRelayRecipientPath = path.resolve(
  __dirname,
  "../contracts",
  "BaseRelayRecipientNft.sol"
);

const storageSource = fs.readFileSync(storagePath, "utf8");
const baseRelayRecipientSource = fs.readFileSync(
  baseRelayRecipientPath,
  "utf8"
);

const input = {
  language: "Solidity",
  sources: {
    "MyNFT.sol": { content: storageSource },
    "BaseRelayRecipientNft.sol": { content: baseRelayRecipientSource },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

//Import resolver
function findImports(importPath) {
  try {
    const fullPath = path.resolve("node_modules", importPath);
    const content = fs.readFileSync(fullPath, "utf8");
    return { contents: content };
  } catch (err) {
    return { error: `File not found: ${importPath}` };
  }
}

// Compile with import callback
const contractCompiled = JSON.parse(
  solc.compile(JSON.stringify(input), { import: findImports })
);

// Get contract output
const mynft = contractCompiled.contracts["MyNFT.sol"].MyNFT;
console.log(chalk.green(mynft.evm.bytecode.object));
console.log(chalk.cyan(JSON.stringify(mynft.abi)));
module.exports = mynft;
