import { Box, IconButton, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { Send as SendIcon } from "@mui/icons-material";
import MessageComponent from "../components/shared/MessageComponent";
import { GetSocket } from "../socket";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useConversationDetailsQuery,
  useGetMessagesQuery,
} from "../redux/api/api";
// import  from "../components/shared/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useInfiniteScrollTop } from "6pp";
import { TypingLoader } from "../components/shared/Loader";
import angry from "../assets/emojis/angry.png"
const Chat = () => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const socket = GetSocket();
  const params = useParams();
  const conversationId = params.chatId;

  const { user } = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const {
    data: conversationData,
    isError: isErrorConversation,
    error: errorConversation,
  } = useConversationDetailsQuery({ conversationId, skip: !conversationId });

  const {
    data: oldMessagesData,
    isError: isErrorMessages,
    error: errorMessages,
  } = useGetMessagesQuery({ conversationId, page });

  useEffect(() => {
    if (isErrorConversation)
      toast.error(errorConversation?.data?.message) || "Something went wrong";
  }, [isErrorConversation, errorConversation]);

  useEffect(() => {
    if (isErrorMessages)
      toast.error(errorMessages?.data?.message) || "Something went wrong";
  }, [isErrorMessages, errorMessages]);

  const { data: newMessagesData, setData: setNewMessages } =
    useInfiniteScrollTop(
      containerRef,
      oldMessagesData?.totalPages,
      page,
      setPage,
      oldMessagesData?.messages
    );

  const allMessages = [...newMessagesData, ...messages];

  // console.log("conversationDetails: ",);
  // console.log("oldMessageData", oldMessagesData);
  const members = conversationData?.conversation.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!isTyping) {
      socket.emit("typing", { conversationId, members });
      setIsTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", { conversationId, members });
      setIsTyping(false);
    }, [2000]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;
    // Emit event to server
    socket.emit("sendMessage", { conversationId, members, message });
    setMessage("");
  };

  useEffect(() => {
    return () => {
      setMessage("");
      setMessages([]);
      setNewMessages([]);
      setPage(1);
    };
  }, [conversationId, setNewMessages]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const newMessageListener = useCallback(
    ({ conversationId: convId, message }) => {
      // console.log("New message received:", message);
      if (convId !== conversationId) return;
      setMessages((prev) => {
        return [...prev, message];
      });
    },
    [conversationId]
  );

  // console.log("allMessages", allMessages);
  const typingListener = useCallback(
    ({ conversationId: convId }) => {
      // console.log("New message received:", message);
      if (convId !== conversationId) return;
      setUserTyping(true);
    },
    [conversationId]
  );
  const stopTypingListener = useCallback(
    ({ conversationId: convId }) => {
      // console.log("New message received:", message);
      if (convId !== conversationId) return;
      setUserTyping(false);
    },
    [conversationId]
  );

  useEffect(() => {
    socket.on("newMessage", newMessageListener);
    socket.on("typing", typingListener);
    socket.on("stopTyping", stopTypingListener);
    return () => {
      socket.off("newMessage", newMessageListener);
      socket.off("typing", typingListener);
      socket.off("stopTyping", stopTypingListener);
    };
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 4rem)",
      }}
    >
      {/* <Toolbar sx={{bgcolor:"#453F3C"}}></Toolbar> */}
      <Stack
        ref={containerRef}
        direction={"column"}
        bgcolor={"#c0c0c0"}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        alignItems={"center"}
        // justifyContent={"flex-end"}
        // overflow={"auto"}
        sx={{
          // flexGrow: 1,
          height: "90%",
          overflowX: "hidden",
          overflowY: "auto",
          //   // backgroundImage: "linear-gradient(to bottom, var(--WDS-app-wash, var(--app-background)), var(--WDS-app-wash, var(--app-background-deeper)))"
        }}
      >
        {allMessages.map((message, index) => (
          <MessageComponent key={message._id} messages={message} user={user}  showEmotion={index >= allMessages.length - 5}/>
        ))}

        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>

      <form style={{ height: "10%" }} onSubmit={submitHandler}>
        <Stack direction={"row"}>
          <TextField
            placeholder="Type message here..."
            variant="filled"
            sx={{
              width: "100%",
              margin: "0.3rem",

              "& .MuiFilledInput-root": {
                borderRadius: "1.5rem",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottom: "none",
              },
            }}
            value={message}
            onChange={messageOnChange}
          />
          
          
          <IconButton type="submit" sx={{ margin: "0.1rem" }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </Box>
  );
};
export default Chat;
