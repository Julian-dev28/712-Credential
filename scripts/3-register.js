const { ethers }  = require('hardhat');

async function attach(name, address) {
  const contractFactory = await ethers.getContractFactory(name);
  return contractFactory.attach(address);
}

async function main() {
  const [issuer, rando] = await ethers.getSigners();
  console.log(`Register Credential`);

  const registry    = (await attach('Credential', '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853')).connect(rando);
  const tokenId     = process.env.TOKENID || 0x1;
  const subject     = process.env.SUBJECT || rando.address;
  const credential   = process.env.SIGNATURE || '0x11bf76aed810c88c350bab3bae2ef813c00ac4ee4212534a08608974eefd4f5a6e3cd5d1df9cd4b97c62f9b828c0443ac2c1487952b248c50f3dc48555a9ae161b';

  const tx = await registry.registerCredential(subject, tokenId, credential);
  const receipt = await tx.wait();

  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
