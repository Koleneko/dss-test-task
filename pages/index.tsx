import type { NextPage } from "next";
import { Button, Container, Text } from "@chakra-ui/react";
import { useState } from "react";

const Home: NextPage = () => {
  const [account, setAccount] = useState<string>("");

  const handleConnect = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request<string[]>({
          method: "eth_requestAccounts",
        });
        if (accounts && accounts.length === 0) {
          setAccount("Couldn't find your account, please login to metamask");
          return;
        }
        // @ts-ignore
        setAccount(accounts[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container
      h={"100vh"}
      justifyContent={"center"}
      display={"flex"}
      flexDir={"column"}
      gap={"15px"}
    >
      <Button isFullWidth onClick={handleConnect}>
        Get public key
      </Button>
      <Text
        outline={"1px solid white"}
        w={"100%"}
        borderRadius={"md"}
        textAlign={"center"}
        p={1}
      >
        {account || "MetaMask is locked - please login"}
      </Text>
    </Container>
  );
};

export default Home;
