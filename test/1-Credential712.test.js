const { ethers } = require('hardhat');
const { expect } = require('chai');

async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}

describe('Credential', function () {
  beforeEach(async function() {
    ({ chainId: this.chainId } = await ethers.provider.getNetwork());
  });

  describe('Register Credential', function () {
    before(async function() {
      const [issuer, rando] = await ethers.getSigners();
      this.registry = await deploy('Credential', 'Name', 'Symbol', issuer.address);
    });

      it('Credential', async function () {
        /**
         * Account[1] (minter) creates signature
         */
        const [issuer, rando] = await ethers.getSigners();
        const tokenId = 8
        const subject = rando.address
        const credential = await issuer._signTypedData(
          // Domain
          {
            name: 'Name',
            version: '1.0.0',
            chainId: this.chainId,
            verifyingContract: this.registry.address,
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
        await expect(this.registry.connect(rando).registerCredential(subject, tokenId, credential))
          .to.emit(this.registry, 'Transfer')
          .withArgs(ethers.constants.AddressZero, subject, tokenId);
        await expect(await this.registry.connect(rando).ownerOf(tokenId)).to.equal(subject)
        await expect(await this.registry.checkRegistration(rando.address)).to.be.true;
      });
  });
});
