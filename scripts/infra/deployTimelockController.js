const hardhat = require("hardhat");

const ethers = hardhat.ethers;

const config = {
  minDelay: 1,
  // 
  proposers: ["0x2C39aaf7d04CB63eeb7df6FDf33d98265C18322A"],
  executors: ["0x2C39aaf7d04CB63eeb7df6FDf33d98265C18322A", "0x2C39aaf7d04CB63eeb7df6FDf33d98265C18322A"],
};

async function main() {
  await hardhat.run("compile");

  const TimelockController = await ethers.getContractFactory("TimelockController");

  const controller = await TimelockController.deploy(config.minDelay, config.proposers, config.executors);
  await controller.deployed();

  console.log(`Deployed to: ${controller.address}`);

  // await hardhat.run("verify:verify", {
  //   address: controller.address,
  //   constructorArguments: Object.values(config),
  // });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
