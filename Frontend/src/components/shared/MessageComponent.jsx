import { Box, Typography } from "@mui/material";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import anger from "../../assets/emojis/angry.png";
import fear from "../../assets/emojis/fear.png";
import love from "../../assets/emojis/love.png";
import sadness from "../../assets/emojis/sad.png";
import surprise from "../../assets/emojis/surprise.png";
import smile from "../../assets/emojis/smile.png";
import axios from "axios";
import { Loader } from "./Loader";

const MessageComponent = ({ messages, user, showEmotion }) => {
  const { senderId, message, createdAt } = messages;
  const sameSender = senderId._id === user._id;
  const timeAgo = moment(createdAt).fromNow();

  const [emotion, setEmotion] = useState(null);
  const [isProcessed, setIsProcessed] = useState(false);
  console.log("emotion", emotion);
  const emotionEmojis = {
    anger,
    fear,
    love,
    sadness,
    surprise,
    smile,
  };

  useEffect(() => {
    // Function to call the backend API for emotion prediction
    if (showEmotion) {
      const fetchEmotion = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_PYTHON_SERVER}/predict`,
            { sentence: message },
            { headers: { "Content-Type": "application/json" } }
          );

          const data = await response.data;
          console.log("data", data);
          setEmotion(data.predicted_emotion);
          setIsProcessed(true)
        } catch (error) {
          console.error("Error fetching emotion:", error);
          // setIsProcessed(false);
        } 
      };

      fetchEmotion();
    }
  }, [message, showEmotion]); // Trigger this effect whenever the message changes

  const getEmoji = (emotion) => {
    return emotionEmojis[emotion] || smile;
  };
  console.log("emotion", emotion, isProcessed);
  return (
    <Box
      style={{
        display: "flex",
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#e0f7fa" : "#fff3e0",
        color: "black",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        margin: "0.5rem",
        maxWidth: "55%",
        wordWrap: "break-word",
        position: "relative",
      }}
    >
      <div style={{ flex: 1 }}>
        {!sameSender && (
          <Typography variant="caption" color={"#2694ab"} fontWeight={600}>
            {senderId.name}
          </Typography>
        )}
        <Typography>{message}</Typography>
        <Typography variant="caption" color={"text.secondary"} fontWeight={600}>
          {timeAgo}
        </Typography>
      </div>

      {/* Image displayed based on sender */}
     {isProcessed && 
        <img
          src={getEmoji(emotion)}
          style={{
            height: "1.2rem",
            width: "1.2rem",
            backgroundColor: "#c0c0c0",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: !sameSender ? "-2rem" : "100%",
            left: !sameSender ? "unset" : "-2rem",
            marginLeft: sameSender ? "0" : "0.5rem", // Adjust for spacing when outside the box
          }}
        />
}
    </Box>
  );
};

export default memo(MessageComponent);
