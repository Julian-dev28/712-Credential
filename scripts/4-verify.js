const { ethers }  = require('hardhat');

async function attach(name, address) {
  const contractFactory = await ethers.getContractFactory(name);
  return contractFactory.attach(address);
}

async function main() {
  const [issuer, rando] = await ethers.getSigners();

  const registry    = (await attach('Credential', '0x5FbDB2315678afecb367f032d93F642f64180aa3')).connect(rando);

  const isRegistered = await registry.checkRegistration(rando.address);
  const balance = await registry.balanceOf(rando.address);
  if(isRegistered === true){
    console.log({Address:rando.address},`holds ${balance} Credential` )
  }
  else {
  console.log(`Address does not hold a Credential, please register and check again`)
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
