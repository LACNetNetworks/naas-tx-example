
// File: contracts/BaseRelayRecipient.sol



pragma solidity >0.6.2;

/**
 * A base contract to be inherited by any contract that want to receive relayed transactions
 * A subclass must use "_msgSender()" instead of "msg.sender"
 */
abstract contract BaseRelayRecipient{

    /*
     * Forwarder singleton we accept calls from
     */
    
    //address internal trustedForwarder = 0x0d0AfaB02AFD0C37c60Cd8a930f16184fD212874; //dev
   address internal trustedForwarder = 0xa4B5eE2906090ce2cDbf5dfff944db26f397037D; //Open-Protest
    //address internal trustedForwarder = 0xEAA5420AF59305c5ecacCB38fcDe70198001d147; //Main Net
    /**
     * return the sender of this call.
     * if the call came through our Relay Hub, return the original sender.
     * should be used in the contract anywhere instead of msg.sender
     */
    function _msgSender() internal virtual returns (address sender) {
        bytes memory bytesRelayHub;
        (,bytesRelayHub) = trustedForwarder.call(abi.encodeWithSignature("getRelayHub()"));

        if (msg.sender == abi.decode(bytesRelayHub, (address))){ //sender is RelayHub then return origin sender
            bytes memory bytesSender;
            (,bytesSender) = trustedForwarder.call(abi.encodeWithSignature("getMsgSender()"));
        
            return abi.decode(bytesSender, (address));
        } else { //sender is not RelayHub, so it is another smart contract 
            return msg.sender;
        }
    }
}
// File: contracts/Storage.sol


pragma solidity >0.6.2;


/**
 * @title Storage
 * @dev Store & retreive value in a variable
 */
contract Storage is BaseRelayRecipient{

    uint256 number;
    address owner;

    constructor() public {
        owner = _msgSender();
    }

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;

        emit ValueSeted(_msgSender(),num);
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retreive() public view returns (uint256){
        return number;
    }

    function getOwner() public view returns (address){
        return owner;
    }

    event ValueSeted(address sender, uint256 value);
}