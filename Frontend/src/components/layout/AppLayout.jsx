// import React from 'react'
// import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Outlet, useParams } from "react-router-dom";
import Header from "./Header";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
// import sampleData from "../../constants/sampleData.json";
import Profile from "../specific/Profile";
import { useMyConversationsQuery } from "../../redux/api/api";
import Loader from "../shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Drawer} from "@mui/material";
import { setisMobile } from "../../redux/reducers/misc";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AppLayout = () => {
  const params = useParams();
  const chatId = params.chatId;
  const dispatch = useDispatch();
  const {
    isMobile,
    isSearch,
    isDeleteMenu,
    selectedDeleteConversation,
  } = useSelector((state) => state.misc);

  const { user } = useSelector((state) => state.auth);
  console.log("APP lAYout", user);
  const { isLoading, data, isError, error } =
    useMyConversationsQuery("");

  useEffect(() => {
    if (isError) toast.error(error?.data?.message) || "Something went wrong";
  }, [isError, error]);

  const handleDeleteChat = (e, id) => {
    e.preventDefault();
    alert(`Delete chat ${id}`);
  };

const handleMobileClose = () => {
  dispatch(setisMobile(false));
}

  return (
    <>
      {/* <Box sx={{margin:'0px'}}> */}
      <Title />
      <Header />

      {isLoading? <Loader />: (<Drawer open={isMobile} onClose={handleMobileClose}  >
        <ChatList w="70vw" chats={data?.conversation} chatId={chatId} onlineUsers={["1", "2"]} handleDeleteChat={handleDeleteChat} />
      </Drawer>)
      }

      <Grid2 container height={"calc(100vh - 4rem)"}>
        <Grid2
          sm={4}
          md={3}
          sx={{
            display: { xs: "none" , sm: "block" },
          }}
          height={"100%"}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <ChatList
              chats={data?.conversation}
              chatId={chatId}
              onlineUsers={["1", "2"]}
              handleDeleteChat={handleDeleteChat}
            />
          )}
        </Grid2>
        <Grid2
          xs={12}
          sm={8}
          md={5}
          lg={6}
          // bgcolor={""311E10"}
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <Outlet />{" "}
        </Grid2>
        <Grid2
          xs={0}
          md={4}
          lg={3}
          bgcolor={"#311E10"}
          sx={{ display: { xs: "none", md:"block" } }}
        >
          <Profile user={user} />
        </Grid2>
      </Grid2>

      {/* </Box> */}
    </>
  );
};

export default AppLayout;
