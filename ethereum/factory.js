import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const address = "0x95C63d95d9E29919F2a7F2c8BcBF43e85C5CA787";

const contract = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  address
);

export default contract;
