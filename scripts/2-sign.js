const { ethers }  = require('hardhat');

async function attach(name, address) {
  const contractFactory = await ethers.getContractFactory(name);
  return contractFactory.attach(address);
}

async function main() {
const [issuer, rando] = await ethers.getSigners();
  console.log(`Sign authorization:`);

  const registry    = (await attach('Credential', '0x5FbDB2315678afecb367f032d93F642f64180aa3')).connect(issuer);
  const { chainId } = await ethers.provider.getNetwork();
  const tokenId     = process.env.TOKENID || 0x1;
  const subject     = process.env.SUBJECT || rando.address;
  const credential   = await issuer._signTypedData(
    // Domain
    {
      name: 'Name',
      version: '1.0.0',
      chainId,
      verifyingContract: registry.address,
    },
    // Types
    {
      Credential: [
        { name: 'tokenId', type: 'uint256' },
        { name: 'subject', type: 'address' },
      ],
    },
    // Value
    { tokenId, subject },
  );

  console.log({ registry: registry.address, tokenId, subject, credential });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
