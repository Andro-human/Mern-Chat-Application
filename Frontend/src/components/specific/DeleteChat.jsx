import { Menu, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { setisDeleteMenu } from "../../redux/reducers/misc";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const DeleteChat = ({ dispatch, deleteMenuAnchor }) => {
  const { isDeleteMenu, selectedDeleteConversation } = useSelector((state) => state.misc);
  const navigate = useNavigate();

  const closeHandler = () => {
    dispatch(setisDeleteMenu(false));
    deleteChatHandler.current = null;
  };

  const deleteChatHandler = () => {
    closeHandler();
    console.log(selectedDeleteConversation.conversationId);
    axios.delete(`${import.meta.env.VITE_SERVER}api/v1/conversations/${selectedDeleteConversation.conversationId}`, {withCredentials: true}).then(() => {
    navigate("/")}).catch((err) => {toast.error(err?.response?.data?.message) || "Something went wrong";});
  };
  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{ width: "10rem", padding: "0.5rem", cursor: "pointer" }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={deleteChatHandler}
      >
        <DeleteIcon />
        <Typography variant={"body1"}>Delete Chat?</Typography>
      </Stack>
    </Menu>
  );
};

export default DeleteChat;
