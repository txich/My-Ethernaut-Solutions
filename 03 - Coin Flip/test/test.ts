import { ethers, network } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";


describe("CoinFlip", function () {

    async function deployCoinFlip() {

        const [CoinFlipowner, hacker] = await ethers.getSigners();

        const CoinFlip = await ethers.getContractFactory("CoinFlip");
        const coinFlip = await CoinFlip.connect(CoinFlipowner).deploy();
        await coinFlip.waitForDeployment();

        const Hack = await ethers.getContractFactory("Hack");
        const hack = await Hack.connect(hacker).deploy(coinFlip.target);
        await hack.waitForDeployment();

        return { coinFlip, hack, CoinFlipowner, hacker };
    }

    describe("Hack Tests", function () {
        it("Should be able to hack the contract", async function () {
            const { coinFlip, hack, hacker, CoinFlipowner } = await loadFixture(deployCoinFlip);

            for (let i = 0; i < 10; i++) {

                await hack.connect(hacker).attack();

                await network.provider.send("evm_mine");

            }
        
            expect(await coinFlip.consecutiveWins()).to.equal(10);

        });
    });

});