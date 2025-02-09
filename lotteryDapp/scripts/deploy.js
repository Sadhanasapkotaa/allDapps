const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Lottery = await ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy();

  console.log("Lottery contract deployed to:", lottery.address);
  saveFrontendFiles(lottery.address);
}

function saveFrontendFiles(contract_address) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Lottery: contract_address }, undefined, 2)
  );

  const LotteryArtifact = artifacts.readArtifactSync("Lottery");

  fs.writeFileSync(
    path.join(contractsDir, "Lottery.json"),
    JSON.stringify(LotteryArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });