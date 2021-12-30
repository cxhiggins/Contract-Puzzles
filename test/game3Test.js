const { assert } = require("chai");

describe("Game3", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game3");
    const game = await Game.deploy();
    await game.deployed();

    // three addresses, three balances
    // you'll need to update the mapping to win this stage

    // hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    
    let addresses = [];
    const values = {
      0: 2,
      1: 3,
      2: 1
    };

    for (let i = 0; i < 3; i++) {
      const signer = ethers.provider.getSigner(i);
      const address = await signer.getAddress();

      // to call a contract as a signer you can use contract.connect
      await game.connect(signer).buy({ value: values[i] });

      addresses.push(address);
    }

    // TODO: win expects three arguments
    await game.win(...addresses);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
