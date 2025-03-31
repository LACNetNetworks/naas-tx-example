// SPDX-License-Identifier:MIT
pragma solidity >=0.8.0 <0.9.0;
abstract contract BaseRelayRecipient{


   address internal trustedForwarder = 0xa4B5eE2906090ce2cDbf5dfff944db26f397037D;  //open-protestnet
   //address internal trustedForwarder = 0xEAA5420AF59305c5ecacCB38fcDe70198001d147; //mainnet

    function _msgSender() internal view virtual returns (address) {
    if (msg.sender == trustedForwarder) {
        assembly {
            let sender := shr(96, calldataload(sub(calldatasize(), 20)))
            mstore(0, sender)
            return(0, 32)
        }
    } else {
        return msg.sender;
    }
}

  //  function _msgSender() internal view  virtual returns (address sender) {
  //      bytes memory bytesRelayHub;
  //      (,bytesRelayHub) = trustedForwarder.call(abi.encodeWithSignature("getRelayHub()"));

  //      if (msg.sender == abi.decode(bytesRelayHub, (address))){ //sender is RelayHub then return origin sender
  //          bytes memory bytesSender;
  //          (,bytesSender) = trustedForwarder.call(abi.encodeWithSignature("getMsgSender()"));

  //          return abi.decode(bytesSender, (address));
  //      } else { //sender is not RelayHub, so it is another smart contract
  //          return msg.sender;
  //      }
  //  }
}