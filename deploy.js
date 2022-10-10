const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // Endpoint MacOs - Take it from ganache
  // http://127.0.0.1:7545
  // creating a provider based on the ganache endpoint
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  // Get the private key from ganache (highly risky and not recommended)
  const wallet = new ethers.Wallet(
    "6dba5a5571e083d18443b4f888ada8a3a2f252ff51cd7368e28952b2808ac1fe",
    provider
  );
  // In order to deploy a contract we need the bytecode (binary) and the ABI
  // the Fs-extra package is used to read the file
  // We are going to read the file synchronously but it can be asynchronous
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const bytecode = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  // We create a contract factory, which is just a object to deploy a contract.
  const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);
  // Deploying the contract (this is going to be asynchronous)
  console.log("Deploying contract...");
  const contract = await contractFactory.deploy(); //Wait for contract to deploy
  console.log("The contract address is: " + contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
