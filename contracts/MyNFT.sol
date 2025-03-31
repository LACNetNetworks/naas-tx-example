// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./BaseRelayRecipientNft.sol";

contract MyNFT is ERC721URIStorage, Ownable, BaseRelayRecipient {
    uint256 private _tokenIds = 1;
    mapping(string => uint256) public emailToTokenId;

    constructor(address _trustedForwarder) 
        ERC721("RegeneraNFT", "REGNFT") 
        Ownable(tx.origin)  

    {
        trustedForwarder = _trustedForwarder;
    }

    function _msgSender() internal view override(Context, BaseRelayRecipient) returns (address) {
        return BaseRelayRecipient._msgSender();
    }

    function mintNFT(string memory userEmail, string memory tokenURI) public onlyOwner returns (uint256) {
        require(emailToTokenId[userEmail] == 0, "Email already registered");

        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _mint(_msgSender(), newItemId);
        _setTokenURI(newItemId, tokenURI);
        emailToTokenId[userEmail] = newItemId;

        return newItemId;
    }

    function getTokenIdByEmail(string memory userEmail) public view returns (uint256) {
        return emailToTokenId[userEmail];
    }

    function versionRecipient() external pure returns (string memory) {
        return "1";
    }

    function owner() public view override returns (address) {
        return super.owner();
    }
}
