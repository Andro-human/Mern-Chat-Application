import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { memo } from "react"; // Add this line to import the 'memo' function
import styled from 'styled-components';
import AvatarCard from "./AvatarCard";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #f0f0f0;
  }
`;


const ChatItem = ({
  avatar,
  name,
  _id,
//   groupChat = false,
  sameSender = true,
  isOnline,
//   newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <StyledLink to={`chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id)} >
        <div style={{
            display: "flex",
            alignItems: "center",
            padding: "1rem",
            position: "relative",
            // gap: "1rem",
            backgroundColor: sameSender ? "#311E10" : "transparent",
            color: sameSender ? "white" : "black",
        }}>
            {/* avatar card */}
            <Stack direction={"row"} spacing={2} sx={{alignItems: "center"}}>
                <AvatarCard avatar={avatar} />
                <Typography>{name}</Typography>  
                {/* {newMessageAlert && <Typography>{newMessageAlert.count} New Message</Typography>}   */}
            </Stack>
            {isOnline && <Box sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "green",
                position: "absolute",
                top: "10",
                right: 10,
            }} 
            />} 
        </div>
    </StyledLink>
  );
};

export default memo(ChatItem);              // this won't be called until any prop changes
