const { ethers }  = require('hardhat');

async function attach(name, address) {
  const contractFactory = await ethers.getContractFactory(name);
  return contractFactory.attach(address);
}

async function main() {
  const [issuer, rando] = await ethers.getSigners();
  console.log(`Register Credential`);

  const registry    = (await attach('Credential', '0x5FbDB2315678afecb367f032d93F642f64180aa3')).connect(rando);
  const tokenId     = process.env.TOKENID || 0x1;
  const subject     = process.env.SUBJECT || rando.address;
  const credential   = process.env.SIGNATURE || '0x6d38fbed48a6dc9f18cd9ed26ebfeefd468b8fcf7d6ab64a145e690aa49d6be927699a2efff9994715bbcd23a4238c7c050f1fedb3c2fd16049534e84083f4391c';

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
