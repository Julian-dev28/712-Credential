# IAM Credential
[Credential.sol](contracts/Credential.sol) is a smart contract that allows a user to register a credential. This contract uses OpenZeppelin open source contracts such AccessControl, ECDSA, and EIP712.  

This contract has a few main features, namely:
* The Issuer address in the constructor is a priveledged signing address
* Once a credential is registered, the subject address is minted an ERC721 token
* Users can check if a subject has a registered credential by calling ``checkRegistration()``
<br>

[Credential.sol](contracts/Credential.sol) uses ECDSA signature checking to ensure that a credential is signed by the issuer that was specified in the constructor

## Development
To install dependencies
run : <br>
```zsh
yarn
```
<br>

To test the contract
run : <br>
```zsh
yarn test
```
<br>

## Deploy locally
To start a hardhat node run : <br>
```zsh
yarn network
```
<br>

To deploy the Credential contract run : <br>
```zsh
yarn deploy
```
<br>

Copy the deployment address into the [sign](scripts/2-sign.js) and [register](scripts/3-register.js) scripts
<br>

To sign the 712 data run : <br>
```zsh
yarn sign
```
<br>

Copy the signature data into the [register](scripts/3-register.js) script
<br>

to register the Credential run : <br>
```zsh
yarn register
```
<br>