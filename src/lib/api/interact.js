import Web3 from "web3";
import { pinJSONtoIPFS } from "./pinata";
require("dotenv")
// const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require("../contract/contract-abi.json");
// const contractAddress = "0x07bE4Dec8889987A9B5B9c03C7ed669467d629F9";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(alchemyKey);

const web3 = new Web3("http://127.0.0.1:8545/")


// TODO：　pinataに画像が保存できなかったときに処理を中止する
export const mintNFT = async (metadata, price) => {
  if (!metadata) {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  const pinataResponse = await pinJSONtoIPFS(metadata)
  console.log("pinataResponse is ", pinataResponse)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .noteMint(tokenURI, price)
      .encodeABI(),
  };
  console.log("--------------")
  console.log("transactionParameters is: ", transactionParameters)
  console.log("--------------")

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    console.log("failed")
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

export const tokenURI = async(id) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const response = await window.contract.methods.tokenURI(id).call()
  .then((res) => {
    return res
  })
  return response
}

// 全てのNFTのURIを取得
export const allNoteURIs = async() => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const response = await window.contract.methods.getAllListedNotes().call()
  .then((res) => {
    console.log(res)
    return res
  })
  .catch((err) => {
    console.log(err)
  })
  return response
}

// 特定のアドレスが所有しているNFTのURIを取得
export const myNoteURIs = async(walletAddress) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const response = await window.contract.methods.getMyNotes().call()
  .then((res) => {
    return res
  })
  .catch((err) => {
    console.log(err)
  })

  return response
}

export const test = async() => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress)
  await window.contract.methods.getListPrice().call()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

  console.log(window.contract.methods)
}