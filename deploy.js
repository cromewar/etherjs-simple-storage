const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // Connnect to Ganache RPC
  const provider = new ethers.providers.JsonRpcProvider(
    "http://172.17.48.1:7545"
  );

  // Get Wallet trough private key
  const wallet = new ethers.Wallet(
    "260e9c3379c06653dbff401f764bfe25973ad83bf467752d424b132a06a726a5",
    provider
  );

  // Take the ABI and the Binary
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  // Contract Factory for deployment
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploying please wait...");

  // Deploy the contract
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
