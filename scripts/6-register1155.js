const { ethers }  = require('hardhat');

async function attach(name, address) {
  const contractFactory = await ethers.getContractFactory(name);
  return contractFactory.attach(address);
}

async function main() {
  const [issuer, rando] = await ethers.getSigners();
  console.log(`Register Credential`);

  const registry    = (await attach('Credential1155', '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512')).connect(rando);
  const tokenId     = process.env.TOKENID || 0x1;
  const subject     = process.env.SUBJECT || rando.address;
  const amount      = 5
  const credential  = process.env.SIGNATURE || '0x44838cce4da5693c61f98143889aeef5f74aa5358db0543f0ef309cf2f6e7bd909bab5bb86d4ed29dbcb4c9289c8858ba89694438bdbaa27947c052206b4adb41c';

  const tx = await registry.registerCredential(subject, tokenId, amount, credential);
  const receipt = await tx.wait();

  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
