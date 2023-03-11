
# Credential Smart Contracts
[Credential.sol](contracts/Credential.sol) and [Credential1155.sol](contracts/Credential1155.sol) are smart contracts designed to allow users to register credentials. The contracts use OpenZeppelin open source contracts, such as AccessControl, ECDSA, and EIP712.

## Main Features
The main features of these contracts are:

* The Issuer address specified in the constructor is a privileged signing address.
* Once a credential is registered, the subject address is minted an ERC721 or ERC1155 token.
* Users can check if a subject has a registered credential by calling ``checkRegistration()``.
* Credential.sol and Credential1155.sol use Access Control and ECDSA signature checking to ensure that a credential is signed by the specified issuer.
<br>

[Credential.sol](contracts/Credential.sol) and [Credential1155.sol](contracts/Credential1155.sol) use Access Control and ECDSA signature checking to ensure that a credential is signed by the issuer that was specified in the constructor

## Development
To install dependencies
run : <br>
```zsh
yarn
```
<br>

To test the contracts
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

To deploy the Credential contracts run : <br>
```zsh
yarn deploy
```

Or

```zsh
yarn deploy1155
```
<br>

Copy the deployment address into the [sign](scripts/2-sign.js) and [register](scripts/3-register.js) scripts
<br>

To sign the 712 data run : <br>
```zsh
yarn sign
```
Or

```zsh
yarn sign1155
```
<br>


Copy the signature data into the [register](scripts/3-register.js) script
<br>

to register the Credential run : <br>
```zsh
yarn register
```
Or

```zsh
yarn register1155
```
<br>

### Thanks For Reading
