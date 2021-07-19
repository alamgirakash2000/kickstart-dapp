import Web3 from "web3";

let web3 = false;
if (typeof window !== "undefined" && window.web3 !== "undefined") {
  // Handle the case when we are inside the browser
  web3 = new Web3(window.web3.currentProvider);
} else {
  // Handle the case when we are outside of the browser
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/15ebeb02363149d697d492aabeb7a6cf"
  );

  web3 = new Web3(provider);
}

export default web3;
