// import React from 'react'
// import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Outlet, useParams } from "react-router-dom";
import Header from "./Header";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import sampleData from "../../constants/sampleData.json";
import Profile from "../specific/Profile";

// xs to md
let isBio = false; // this should be on the chat page
// only xs
let onChat = true; // this should be on the sidebar page

const AppLayout = () => {
  const params = useParams();
  const chatId = params.chatId;
  
  const handleDeleteChat = (e, id) => {
    e.preventDefault();
    alert(`Delete chat ${id}`, );
  };

  return (
    <>
      {/* <Box sx={{margin:'0px'}}> */}
      <Title />
      <Header />
      <Grid2 container height={"calc(100vh - 4rem)"} >
        <Grid2
          xs={onChat ? 0 : 12}
          sm={5}
          md={4}
          sx={{ display: { xs: isBio||onChat ? "none" : "block", sm: "block" }}}
        height={"100%"}
        >
          <ChatList chats={sampleData.conversations} chatId={chatId} onlineUsers={["1", "2"]} handleDeleteChat={handleDeleteChat}/>
        </Grid2>
        <Grid2
          xs={onChat ? 12 : 0}
          sm={7}
          md={isBio ? 4 : 8}
          // bgcolor={""311E10"}
          sx={{
            display: {
              xs: !isBio && onChat ? "block" : "none",
              sm: !isBio ? "block" : "none",
              md: "block",
            },
          }}
        >
          <Outlet />{" "}
        </Grid2>
        <Grid2
          xs={12}
          sm={7}
          md={4}
          bgcolor={"#311E10"}
          sx={{ display: { xs: isBio ? "block" : "none" } }}
        >
          <Profile />
        </Grid2>
      </Grid2>

      {/* </Box> */}
    </>
  );
};

export default AppLayout;
