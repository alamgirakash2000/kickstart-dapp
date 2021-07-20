import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const address = "0x0cB0D16fcf4efBb265675870770eab0BDC582e3D";

const contract = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  address
);

export default contract;
