import { ethers, network } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

describe ("Telephone", function () {

    async function deployTelephone() {

        const [telephoneOwner, hacker] = await ethers.getSigners();

        const Telephone = await ethers.getContractFactory("Telephone");
        const telephone = await Telephone.connect(telephoneOwner).deploy();
        await telephone.waitForDeployment();

        const Hack = await ethers.getContractFactory("Hack");
        const hack = await Hack.connect(hacker).deploy(telephone.target);
        await hack.waitForDeployment();

        return { telephone, hack, telephoneOwner, hacker };
    }

    describe("Hack Tests", function () {
        it("Should be able to hack the contract", async function () {
            const { telephone, hack, hacker, telephoneOwner } = await loadFixture(deployTelephone);

            expect(await telephone.owner()).to.equal(telephoneOwner.address);

            await hack.connect(hacker).hackChangeOwner(hacker.address);

            expect(await telephone.owner()).to.equal(hacker.address);
        });
    });

});
