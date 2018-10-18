import Web3 from 'web3';

let web3;
if (typeof window.web3 !== 'undefined') web3 = new Web3(window.web3.currentProvider);
else {
  console.log('Install Metamask');
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}
export default web3;
