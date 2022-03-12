const { ethers }  = require('hardhat');

async function deploy(name, ...params) {
  const contractFactory = await ethers.getContractFactory(name);
  return await contractFactory.deploy(...params).then(f => f.deployed());
}

async function main() {
  const [issuer, rando] = await ethers.getSigners();
  console.log(`Deploying contracts:`);

  const registry = (await deploy('Credential', 'Name', 'Symbol' , issuer.address));

  console.log({ registry: registry.address }, rando.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
