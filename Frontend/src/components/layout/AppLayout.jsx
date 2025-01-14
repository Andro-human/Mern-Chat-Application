// import React from 'react'
// import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
// import sampleData from "../../constants/sampleData.json";
import Profile from "../specific/Profile";
import { useMyConversationsQuery } from "../../redux/api/api";
import {Loader} from "../shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Box, Drawer} from "@mui/material";
import { setisDeleteMenu, setisMobile, setSelectedDeleteConversation } from "../../redux/reducers/misc";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import DeleteChat from "../specific/DeleteChat";
import { GetSocket } from "../../socket";
// import { GetSocket } from "../../socket";

const AppLayout = () => {
  const params = useParams();
  const navigate = useNavigate();
  const socket = GetSocket();
  const chatId = params.chatId;
  const deleteMenuAnchor = useRef();
  const dispatch = useDispatch();
  const [onlineUsers, setOnlineUsers] = useState([]);

  const {refetch} = useMyConversationsQuery("");

  const onlineUsersListener = useCallback(({userIDs}) => {
    setOnlineUsers(userIDs);
  });

  const refetchListener = useCallback(() => {
    refetch();
    navigate("/");
  }, []);

  useEffect(() => {
    socket.on("onlineUsers", onlineUsersListener);
    socket.on("refetchChats", refetchListener);
    // socket.on("disconnect", onlineUsersListener);
    return () => {
      socket.off("onlineUsers", onlineUsersListener);
      socket.off("refetchChats", refetchListener);
    };
  }, [socket, onlineUsersListener]);
  // const socket = GetSocket();
  const {
    isMobile,
  } = useSelector((state) => state.misc);

  const { user } = useSelector((state) => state.auth);
  const { isLoading, data, isError, error } =
    useMyConversationsQuery("");
  useEffect(() => {
    if (isError) toast.error(error?.data?.message) || "Something went wrong";
  }, [isError, error]);

  const handleDeleteChat = (e, conversationId) => {
    e.preventDefault();
    dispatch(setisDeleteMenu(true));
    dispatch(setSelectedDeleteConversation({ conversationId }));
    deleteMenuAnchor.current = e.currentTarget;
  };

const handleMobileClose = () => {
  dispatch(setisMobile(false));
}

  return (
    // <>
    <Box sx={{overflow: "hidden"}}>
      <Title />
      <Header socket={socket} />
      <DeleteChat dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor}/>
      {isLoading? <Loader />: (<Drawer open={isMobile} onClose={handleMobileClose}  >
        <ChatList w="70vw" chats={data?.conversation} chatId={chatId} onlineUsers={onlineUsers} handleDeleteChat={handleDeleteChat} />
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
              onlineUsers={onlineUsers}
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
              // xs: "none",
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

      </Box>
    // </>
  );
};

export default AppLayout;
