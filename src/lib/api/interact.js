import axios from "axios";
import { pinJSONtoIPFS } from "./pinata";
require("dotenv")
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require("../contract/contract-abi.json");
const contractAddress = "0x07bE4Dec8889987A9B5B9c03C7ed669467d629F9";
// const contractAddress = "0xd5e8B397f1Aa6059b2f81ef52b26e07B6c1b164c"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);


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
      .noteMint(tokenURI, 0)
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
export const allTokenURIs = async() => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const counts =
  await window.contract.methods.latest_tokenId().call()
  .then((res) => {
    return(res)
  })
  .catch((err) => {
    console.log(err)
  })
  const URIs = Array()
  for (let i = 0; i < counts; i++) {
    await tokenURI(i)
    .then((res) => {
      axios
        .get(res)
        .then((res) => {
          URIs.push(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return URIs
}

// 特定のアドレスが所有しているNFTのURIを取得
export const ownerTokenURIs = async(walletAddress) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const counts =
  await window.contract.methods.balanceOf(walletAddress).call()
  .then((res) => {
    return res
  })
  .catch((err) => {
    console.log(err)
  })
  const URIs = Array()
  for (let i = 0; i < counts; i++) {
    await tokenURI(i)
      .then((res) => {
        // console.log(res);
        axios
          .get(res)
          .then((res) => {
            // console.log(res.data);
            URIs.push(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return URIs
}

export const transferNFT = async(walletAddress ,tokenId) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress)
  const OwnerAddress = await getOwner(tokenId)
  console.log("wallet address is: ", walletAddress)
  console.log("owner address is: ", OwnerAddress)
  await window.contract.methods.TransferNFT(OwnerAddress, walletAddress, tokenId).call()
  .then((res) => {
    console.log(res)
    return res
  })
  .catch((err) => {
    console.log(err)
    return err
  })
}

export const getOwner = async(id) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress)
  const response = await window.contract.methods.ownerOf(id).call()
  .then((res) => {
    console.log(res)
    return res
  })
  .catch((err) => {
    console.log(err)
  })
  return response
}

export const getLatestTokenId = async() => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress)
  await window.contract.methods.latest_tokenId().call()
  .then((res) => {
    return res
  })
  .catch((err) => {
    console.log(err)
  })
}

export const test = async() => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress)
  await window.contract.methods.latest_tokenId().call()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

  // console.log(window.contract.methods)
}