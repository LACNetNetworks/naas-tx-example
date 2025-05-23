const Web3 = require('web3');
var provider =  'http://146.148.73.191';
// Conectar a tu nodo (puedes usar la URL de un nodo local o Infura si es red pública)
//const web3 = new Web3('http://localhost:8545'); // Ajusta el URL de tu nodo si es necesario
var web3 = new Web3(new Web3.providers.HttpProvider(provider))
const usersContractCompile = require('../scripts/compile');
// ABI del contrato (simplificado para el método retrieve)
//usersContractCompile.evm.bytecode.object
const abi = usersContractCompile.abi

// Dirección del contrato desplegado
const contractAddress = '0xdE1Ca01DBcc1E327AeDd89b9Bf1a425069A3cE61'; // Reemplaza con la dirección real

// Cargar el contrato con web3
const contract = new web3.eth.Contract(abi, contractAddress);

// Llamar al método retrieve
async function getRetrieveValue() {
  try {
    const value = await contract.methods.retreive().call();
    console.log("Valor retornado por retreive():", value);
  } catch (error) {
    console.error("Error al llamar al método retreive:", error);
  }
}

// Ejecutar la función
getRetrieveValue();
