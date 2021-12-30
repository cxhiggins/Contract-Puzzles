const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck
    const signer = new ethers.Wallet("0x8ff02b8f19d6267ec2ac5e2a540055900bb46673e0573c673401682e8c78aaf1", ethers.provider);
    const address = await signer.getAddress();

    // transfer balance from first auto-generated account
    const tx = await ethers.provider.getSigner(0).sendTransaction({
      value: ethers.utils.parseEther("1"),
      to: address,
    });
    await tx.wait();

    await game.connect(signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
