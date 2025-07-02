import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";

describe("Fallback", function () {

    async function deployFallback() {

        const [fallbackowner, hacker] = await ethers.getSigners();

        const Fallback = await ethers.getContractFactory("Fallback");
        const fallback = await Fallback.connect(fallbackowner).deploy();
        await fallback.waitForDeployment();

        const Hack = await ethers.getContractFactory("Hack");
        const hack = await Hack.connect(hacker).deploy(fallback.target);
        await hack.waitForDeployment();

        return { fallback, hack, fallbackowner, hacker };
    }

    describe("Hack Tests", function () {
        it("Should be able to hack the contract", async function () {
            const { fallback, hack, hacker } = await loadFixture(deployFallback);

            // Check initial balance
            expect(await ethers.provider.getBalance(fallback.target)).to.equal(0);

            // Execute the hack
            await hack.connect(hacker).attack({ value: 200 });

            // Check if the fallback function was called
            expect(await fallback.owner()).to.equal(hack.target);
        });
    });

});