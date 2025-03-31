const { ethers } = require("ethers");

// 🚀 Configuración del nodo RPC (cambia esto si usas otro proveedor)
const RPC_URL = "http://34.41.10.248:4545"; // URL de tu nodo Ethereum o LACChain
const CONTRACT_ADDRESS = "0xed629f027a35B377F0a9Fd4560167e0AA85817Cf"; // Dirección del contrato

// 🚀 Conectar a la blockchain
const provider = new ethers.JsonRpcProvider(RPC_URL);

// 🚀 Interfaz ABI mínima necesaria para la consulta
const ABI = [
    "function getRoleMember(bytes32 role, uint256 index) public view returns (address)"
];

// 🚀 Identificador del rol de Admin (DEFAULT_ADMIN_ROLE = 0x00 en 32 bytes)
const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";

/*
El comando curl equivalente sería:

# Para index 0:
curl -X POST http://34.41.10.248:4545 \
-H "Content-Type: application/json" \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_call", 
    "params":[{
        "to": "0xed629f027a35B377F0a9Fd4560167e0AA85817Cf",
        "data": "0x9010d07c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    }, "latest"],
    "id":1
}'

Donde:
- 9010d07c es el selector de la función getRoleMember(bytes32,uint256)
- Los siguientes 32 bytes son el DEFAULT_ADMIN_ROLE (todos ceros)
- Los últimos 32 bytes son el índice 0
*/

// 🚀 Función para obtener el owner (admin)
async function getOwner() {
    try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const ownerAddress = await contract.getRoleMember(DEFAULT_ADMIN_ROLE, 3);
        console.log(`👑 Owner (Admin) del contrato: ${ownerAddress}`);
    } catch (error) {
        console.error("❌ Error al obtener el owner:", error);
    }
}

// 🚀 Ejecutar la función
getOwner();

