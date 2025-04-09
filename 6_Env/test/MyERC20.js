const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("MyERC20", function () {
  async function deployMyERC20Fixture() {
    const totalSupply = ethers.parseEther("1000")
    const signers = await ethers.getSigners()
    const owner = signers[0]
    const acc1 = signers[1]
    const acc2 = signers[2]

    const Factory = await ethers.getContractFactory("MyERC20")
    const contract = await Factory.deploy(totalSupply)

    return { contract, totalSupply, owner, acc1, acc2 }
  }

  describe("Deployment", function () {
    it("should set the name correctly", async function () {
      const { contract } = await loadFixture(deployMyERC20Fixture)
      expect(await contract.name()).to.equal("MyERC20")
    })

    it("should set the symbol correctly", async function () {
      const { contract } = await loadFixture(deployMyERC20Fixture)
      expect(await contract.symbol()).to.equal("ME20")
    })

    it("should set the total supply correctly", async function () {
      const { contract, totalSupply } = await loadFixture(deployMyERC20Fixture)
      expect(await contract.totalSupply()).to.equal(totalSupply)
    })

    it("should set the total supply in the owner's posession", async function() {
      const { contract, totalSupply, owner } = await loadFixture(deployMyERC20Fixture)
      expect(await contract.balanceOf(owner.address)).to.equal(totalSupply)
    })
  })

  describe("Transfers", function () {
    it("should successfully transfer tokens", async function () {
      const { contract, owner, acc1 } = await loadFixture(deployMyERC20Fixture)
      const transferAmount = ethers.parseEther("1")
      const tx = await contract.transfer(acc1.address, transferAmount)
      await tx.wait()
      expect(await contract.balanceOf(acc1.address)).to.equal(transferAmount)
    })

    it("should fail at transferring tokens if sender has no tokens", async function () {
      const { contract, owner, acc1 } = await loadFixture(deployMyERC20Fixture)
      const transferAmount = ethers.parseEther("1")
      // this passes probably because there is no require statement in my contract
      await expect(contract.connect(acc1).transfer(owner.address, transferAmount)).to.be.reverted
    })
  })

  describe("Events", function () {
    it("should emit the Transfer event when a transfer occurs", async function () {
      const { contract, owner, acc1 } = await loadFixture(deployMyERC20Fixture)
      const transferAmount = ethers.parseEther("1")
      await expect(contract.transfer(acc1.address, transferAmount)).to.emit(contract, "Transfer").withArgs(owner.address, acc1.address, transferAmount)
    })
  })

  describe("Minting", function () {
    it("should increase the total supply", async function () {
      const { contract, totalSupply, acc1 } = await loadFixture(deployMyERC20Fixture)
      const mintedAmount = ethers.parseEther("250")
      const newTotalSupply = totalSupply + mintedAmount
      const tx = await contract.mint(acc1.address, mintedAmount)
      await tx.wait()
      expect(await contract.totalSupply()).to.equal(newTotalSupply)
    })

    it("should correctly assign the minted tokens to the specified address", async function () {
      const { contract, totalSupply, acc1 } = await loadFixture(deployMyERC20Fixture)
      const mintedAmount = ethers.parseEther("250")
      const tx = await contract.mint(acc1.address, mintedAmount)
      await tx.wait()
      expect(await contract.balanceOf(acc1.address)).to.equal(mintedAmount)
    })
  })

  describe("Approval", function () {
    it("should correctly set the specified allowance for the delegate", async function () {
      const { contract, owner, acc1 } = await loadFixture(deployMyERC20Fixture)
      const allowedAmount = ethers.parseEther("100")
      const tx = await contract.approve(acc1.address, allowedAmount)
      await tx.wait()
      expect(await contract.allowance(owner.address, acc1.address)).to.equal(allowedAmount)
    })

    it("should correctly emit the Approval event", async function () {
      const { contract, owner, acc1 } = await loadFixture(deployMyERC20Fixture)
      const allowedAmount = ethers.parseEther("100")
      await expect(contract.approve(acc1.address, allowedAmount)).to.emit(contract, "Approval").withArgs(owner.address, acc1.address, allowedAmount)
    })

    it("should allow a delegate to spend the allowance", async function () {
      const { contract, owner, acc1, acc2 } = await loadFixture(deployMyERC20Fixture)
      const allowedAmount = ethers.parseEther("100")
      const transferAmount = ethers.parseEther("50")
      const tx = await contract.approve(acc1.address, allowedAmount)
      await tx.wait()
      
      const newCon = await contract.connect(acc1)
      const tx2 = await newCon.transferFrom(owner.address, acc2.address, transferAmount)
      await tx2.wait()
      expect(await newCon.allowance(owner.address, acc1.address)).to.equal(allowedAmount - transferAmount)
    })

    it("should revert a transfer if allowance is not enough", async function () {
      const { contract, owner, acc1, acc2 } = await loadFixture(deployMyERC20Fixture)
      const transferAmount = ethers.parseEther("150")
      await expect(contract.connect(acc1).transferFrom(owner.address, acc2.address, transferAmount)).to.be.reverted
    })
  })
})