// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol';
import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';

contract Credential1155 is ERC1155, EIP712, AccessControl {
  using ECDSA for bytes32;
  bytes32 public constant ISSUER = keccak256('ISSUER');
  mapping(address => bool) public registered;
  address public _issuer;

  // Set the issuer address that is allowed to sign EIP-712 Credentials
  constructor(
    string memory name,
    string memory metadata,
    address issuer
  ) ERC1155(metadata) EIP712(name, '1.0.0') {
    _setupRole(ISSUER, issuer);
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _issuer = issuer;
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC1155, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function checkRegistration(address subject) public view returns (bool) {
    // Check if a subject has a registered credential
    return registered[subject] ? true : false;
  }

  function registerCredential(
    address subject,
    uint256 tokenId,
    uint256 amount,
    bytes calldata credential
  ) public {
    bytes32 credentialHash = _hash(subject, tokenId);
    require(_verify(credentialHash, credential), 'Invalid signature');
    registered[subject] = true;
    // If a credential is registered, then mint a token of your choosing for the subject of the credential
    _mint(subject, tokenId, amount, credential);
  }

  function _hash(address subject, uint256 tokenId) internal view returns (bytes32) {
    return
      _hashTypedDataV4(
        keccak256(
          abi.encode(keccak256('Credential(uint256 tokenId,address subject)'), tokenId, subject)
        )
      );
  }

  function _verify(bytes32 digest, bytes memory credential) internal view returns (bool) {
    //Should only register the subject of the credential if the credential is signed by the issuer that was specified in the constructor
    return hasRole(ISSUER, ECDSA.recover(digest, credential));
  }
}
