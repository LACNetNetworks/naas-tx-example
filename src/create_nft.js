const { ethers } = require("ethers");

const { 
  LacchainProvider, 
  LacchainSigner 
} = require("@lacchain/gas-model-provider");

const contractAbi = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

async function main() {
  const yourRPCNode = "https://test-naas.lacnet.com/rpc";
  const nodeAddress = "0xCc54291c2359e4C2b2A15fa79233E8F5391520d";
  const privateKey = "5a2b6F9710bd035c1c7Fe290d099be53d5de0e1bc5b67c02d405cb03b17064c";
  const trustedForwarder = "0xa4B5eE2906090ce2cDbF5dFFF94Adb26F3970370";

  console.log("Starting deployment of contract:", contractAbi.contractName);
  const expiration_date = Date.now() + 5 * 60 * 1000;

  const provider = new LacchainProvider(yourRPCNode);
  const signer = new LacchainSigner(
    privateKey,
    provider,
    nodeAddress,
    expiration_date
  );

  console.log(`Creating contract factory for ${contractAbi.contractName}...`);

  const contractFactory = new ethers.ContractFactory(
    contractAbi.abi,
    contractAbi.bytecode,
    signer
  );

  console.log(`Deploying ${contractAbi.contractName}...`);

  const contract = await contractFactory.deploy(trustedForwarder);
  const receipt = await contract.deploymentTransaction.wait();

  console.log("Contract successfully deployed!");
  const contractAddress = receipt?.contractAddress;

  console.log(`${contractAbi.contractName} Contract Address: `, contractAddress);
}

// Execute Deployment
main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
