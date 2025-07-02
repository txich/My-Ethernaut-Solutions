# My Ethernaut Solutions

This repository contains my solutions to the [Ethernaut](https://ethernaut.openzeppelin.com/) smart contract challenges. Each Ethernaut problem is organized into its own folder, initialized as a separate Hardhat project.

## Structure

For every problem, the folder includes:
- **contracts/**  
  - `Challenge.sol`: The original Ethernaut problem contract.
  - `Hack.sol`: My exploit contract that demonstrates the solution.
- **test/**  
  Automated tests that prove the exploit works and the challenge is solved.
- **ignition/**  
  Deployment scripts for both the challenge and the hack contracts using Hardhat Ignition.

## Usage

1. Navigate to the desired problem's folder.
2. Install dependencies with `npm install` or `yarn`.
3. Run tests with `npx hardhat test`.
4. Deploy contracts using the scripts in the `ignition/` directory.

---

Feel free to check out each folder for detailed solutions and learn more about Ethereum security!
