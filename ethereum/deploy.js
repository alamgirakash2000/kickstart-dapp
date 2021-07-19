const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

require("dotenv").config({ path: __dirname + "/./../.env" });

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.RINKEBYEND
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account:", accounts[0]);

  let result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" })
    .catch((err) => console.log(err.message));
  console.log("Contract deployed to : ", result?.options.address);
};
deploy();
