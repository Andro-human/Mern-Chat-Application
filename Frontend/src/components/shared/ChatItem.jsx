import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { memo } from "react"; // Add this line to import the 'memo' function

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return (
    <Link to={`chat/${_id}`} onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)} style={{
        textDecoration: "none",
        color: "black",
        padding: 0,
        "&:hover": {
            backgroundColor: "#0f0f0f"
        }
    }}>
        <div style={{
            display: "flex",
            alignItems: "center",
            padding: 10,
            position: "relative",
            // backgroundColor: sameSender ? "rgba(0,0,0,0.1)" : "transparent",
        }}>
            <Stack direction={"row"} spacing={2}>
                <Typography>{name}</Typography>  
                {newMessageAlert && <Typography>{newMessageAlert.count} New Message</Typography>}  
            </Stack>
            {isOnline && <Box sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "green",
                position: "absolute",
                top: 0,
                right: 0,
            }} />} 
        </div>
    </Link>
  );
};

export default memo(ChatItem);              // this won't be called until any prop changes
