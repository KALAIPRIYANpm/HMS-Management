import Web3 from 'web3';
import HospitalNFT from './HospitalNFT.json'; // ABI file

const web3 = new Web3(window.ethereum);
const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
const contractInstance = new web3.eth.Contract(HospitalNFT.abi, contractAddress);

export default contractInstance;
