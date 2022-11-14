import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Stack, CardContent, Typography, TextField, Input, Button } from "@mui/material";

import Header from "../../components/Header/Header";
import { connectWallet, getCurrentWalletConnected } from "../../lib/api/wallet";
import { sendNoteToIPFS } from "../../lib/api/pinata"
import { mintNFT } from "../../lib/api/interact";

const Post = () => {
  const [note, setNote] = useState()
  const [title, setTitle] = useState();
  const [description, setDescription] = useState()

  const [walletAddress, setWalletAddress] = useState();
  const [status, setStatus] = useState();

  const navigate = useNavigate()

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  };

  const GetCurrentWalletConnected = async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWalletAddress(address);
    setStatus(status);
  }

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("acountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWalletAddress("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      })
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", note);
    console.log(note)
    const imageUrl = await sendNoteToIPFS(formData)

    // make matadata
    const metadata = new Object();
    metadata.title = title;
    metadata.imageUrl = imageUrl;
    metadata.description = description
    metadata.create_at = new Date().toLocaleString();
    console.log(metadata)

    try {
      const { success, status } = await mintNFT(metadata); 
      setStatus(status)
      if (success) {
        setTitle("");
        setDescription("");
        setNote("");
        navigate("/", { state: {message: "投稿しました！"}})
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="post">
      <Header />
      <div className="post_content">
        <button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress?.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
        <form
            onSubmit={handleSubmit}
        >
          <Card className="post_card">
              <Container>
                <Stack spacing={2}>
                  <CardContent>
                    <Typography style={{fontFamily: "Times New Roman"}}>画像や動画を投稿</Typography>
                  </CardContent>
                {/* <CardActions> */}
                    <TextField
                      placeholder="タイトル"
                      onChange={(e) => {setTitle(e.target.value)}}
                    />
                    <Input
                      type="file"
                    />
                    <TextField
                      placeholder="講義内容"
                      onChange={(e) => {setDescription(e.target.value)}}
                      // variant="standard" 
                      fullWidth required
                    />
                    <Button
                      className="post_button"
                      type="submit"
                    >
                      投稿
                    </Button>
                </Stack>
                {/* </CardActions> */}
              </Container>
          </Card>
        </form>
        {status}
      </div>
    </div>
  )
}

export default Post