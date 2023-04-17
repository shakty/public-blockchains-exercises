// Place in tests/ to execute it.

const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("ERC20", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployERC20() {
        const name = "MyERC20",
            symbol = "MR20",
            totalSupply = 1000;

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const ERC20 = await ethers.getContractFactory("MyERC20");
        const myErc20 = await ERC20.deploy(name, symbol, totalSupply);

        return { myErc20, name, symbol, totalSupply, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should set the right name", async function () {
            const { myErc20, name } = await loadFixture(deployERC20);
            expect(await myErc20.name()).to.equal(name);
        });

        it("Should set the right symbol", async function () {
            const { myErc20, symbol } = await loadFixture(deployERC20);
            expect(await myErc20.symbol()).to.equal(symbol);
        });

        it("Should set the right total supply", async function () {
            const { myErc20, totalSupply } = await loadFixture(deployERC20);
            expect(await myErc20.totalSupply()).to.equal(totalSupply);
        });

        it("Should set the owner", async function () {
            const { myErc20, owner } = await loadFixture(deployERC20);
            expect(await myErc20.owner()).to.equal(owner.address);
        });

        it("Should set the balance of owner equal to total supply", async function () {
            const { myErc20, totalSupply, owner } = await loadFixture(
                deployERC20
            );
            expect(await myErc20.balanceOf(owner.address)).to.equal(
                totalSupply
            );
        });
    });

    describe("Transfers", function () {
        it("Should decrease balance of owner and increase balance of otherAccount", async function () {
            const { myErc20, owner, totalSupply, otherAccount } =
                await loadFixture(deployERC20);

            const COINS = 10;
            await myErc20.transfer(otherAccount.address, COINS);
            expect(await myErc20.balanceOf(owner.address)).to.equal(
                totalSupply - COINS
            );
            expect(await myErc20.balanceOf(otherAccount.address)).to.equal(
                COINS
            );
        });

        it("Should decrease balance of otherAccount and increase balance of owner", async function () {
            const { myErc20, owner, otherAccount } = await loadFixture(
                deployERC20
            );

            let COINS = 10;
            await myErc20.transfer(otherAccount.address, COINS);

            COINS = 2;
            await expect(
                myErc20.connect(otherAccount).transfer(owner.address, COINS)
            ).to.changeTokenBalances(
                myErc20,
                [otherAccount, owner],
                [-COINS, COINS]
            );
        });

        it("Should fail if sender doesn't have enough tokens", async function () {
            const { myErc20, totalSupply, owner, otherAccount } =
                await loadFixture(deployERC20);

            // Try to send 1 token from owner (0 tokens) to owner.
            // `require` will evaluate false and revert the transaction.
            await expect(
                myErc20.connect(otherAccount).transfer(owner.address, 1)
            ).to.be.revertedWith("Not enough tokens");

            // Owner balance shouldn't have changed.
            expect(await myErc20.balanceOf(owner.address)).to.equal(
                totalSupply
            );
        });
    });

    describe("Events", function () {
        it("Should emit Transfer events", async function () {
            const { myErc20, owner, otherAccount } = await loadFixture(
                deployERC20
            );

            const COINS = 10;

            // Transfer 50 tokens from owner to owner
            await expect(myErc20.transfer(otherAccount.address, COINS))
                .to.emit(myErc20, "Transfer")
                .withArgs(owner.address, otherAccount.address, COINS);

            // Transfer COINS tokens from owner to otherAccount
            // We use .connect(signer) to send a transaction from 
            // another account.
            await expect(
                myErc20.connect(otherAccount).transfer(owner.address, COINS)
            )
                .to.emit(myErc20, "Transfer")
                .withArgs(otherAccount.address, owner.address, COINS);
        });
    });

    describe("Minting", function () {
        it("Should increase total supply", async function () {
            const { myErc20, totalSupply, otherAccount } = await loadFixture(
                deployERC20
            );

            const COINS = 10;

            await myErc20.mint(otherAccount.address, COINS);

            expect(await myErc20.totalSupply()).to.equal(totalSupply + COINS);
        });

        it("Should increase balance of otherAccount", async function () {
            const { myErc20, otherAccount } = await loadFixture(deployERC20);

            const COINS = 10;
            await myErc20.mint(otherAccount.address, COINS);

            // Transfer 50 tokens from owner to owner
            expect(await myErc20.balanceOf(otherAccount.address))
                .to.equal(COINS);
        });
    });

    describe("Approve Pattern", function () {
        it("Should approve a delegate for a given amount", async function () {
            const { myErc20, owner, otherAccount } = await loadFixture(
                deployERC20
            );

            const COINS = 10;

            await myErc20.approve(otherAccount.address, COINS);

            expect(await myErc20.allowance(owner.address, otherAccount.address))
                .to.equal(COINS);
        });

        it("Should allow a delegate to spend another account's tokens", async function () {
            const { myErc20, owner, otherAccount } = await loadFixture(
                deployERC20
            );

            const APPROVED_COINS = 10;
            await myErc20.approve(otherAccount.address, APPROVED_COINS);

            const SPENT_COINS = 2;
            await myErc20.connect(otherAccount)
                .transferFrom(owner.address, otherAccount.address, SPENT_COINS);

            expect(await myErc20.balanceOf(otherAccount.address))
                .to.equal(SPENT_COINS);

            const ALLOWANCE_LEFT = 8;
            expect(await myErc20.allowance(owner.address, otherAccount.address))
                .to.equal(ALLOWANCE_LEFT);

        });

        it("Should revert if allowance becomes negative", async function () {
            const { myErc20, owner, otherAccount } = await loadFixture(
                deployERC20
            );

            const APPROVED_COINS = 2;
            await myErc20.approve(otherAccount.address, APPROVED_COINS);

            const SPENT_COINS = 4;

            await expect(
                myErc20.connect(otherAccount)
                .transferFrom(owner.address, otherAccount.address, SPENT_COINS)
            ).to.be.revertedWith("Allowance not enough");
            
        });

        
    });
});
