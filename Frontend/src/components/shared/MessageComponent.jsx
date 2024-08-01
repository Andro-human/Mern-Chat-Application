import { Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";

const MessageComponent = ({ message, user }) => {
  const { sender, content, createdAt } = message;
  const sameSender = sender._id === user._id;

  const timeAgo =moment(createdAt).fromNow();

  return (
    <div style={{ alignSelf: sameSender ? "flex-end" : "flex-start",
      backgroundColor: "white", color: "black", padding: "0.5rem", borderRadius: "0.5rem", margin: "0.5rem", maxWidth: "55%", wordWrap: "break-word"
     }}>
      {
        !sameSender && <Typography variant="caption" color={"#2694ab"} fontWeight={600}>{sender.name} </Typography>}
      <Typography>{content}</Typography>
      <Typography variant="caption" color={"text.secondary"} fontWeight={600}>{timeAgo}</Typography>
    </div>
  );
};

export default memo(MessageComponent);
