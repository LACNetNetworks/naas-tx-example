General Logger:	2024/05/25 17:53:40 client.go:46: Connected to Ethereum Node: http://127.0.0.1:5545
General Logger:	2024/05/25 17:53:40 client.go:305: RelayHub Contract instanced: 0x3d49d1eF2adE060a33c6E6Aa213513A7EE9a6241
General Logger:	2024/05/25 17:53:40 relaySignerService.go:268: current gasLimit assigned: 1 000 000
General Logger:	2024/05/25 17:53:40 relaySignerService.go:422: gasLimit used in currently block: 3160375
General Logger:	2024/05/25 17:53:40 relaySignerService.go:444: transaction gas limit exceeds block gas limit
    3160375


General Logger:	2024/06/24 01:34:32 client.go:46: Connected to Ethereum Node: http://localhost:4545
General Logger:	2024/06/24 01:34:32 client.go:305: RelayHub Contract instanced: 0xd9017162246c6F16B2e425Fadbfa986C1CEcCEDc
General Logger:	2024/06/24 01:34:32 relaySignerService.go:266: current gasLimit assigned: 0
General Logger:	2024/06/24 01:34:32 relaySignerService.go:420: gasLimit used in currently block: 6160375
General Logger:	2024/06/24 01:34:32 relaySignerService.go:442: transaction gas limit exceeds block gas limit


RelayHub Contract instanced: 0xd9017162246c6F16B2e425Fadbfa986C1CEcCEDc


    curl -i -X POST \
-H "Content-Type: application/json" \
--data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", true],"id":1}' 34.132.228.174