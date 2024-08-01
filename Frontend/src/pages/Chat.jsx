import { IconButton, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { Send as SendIcon } from "@mui/icons-material";
import sampleData from "../constants/sampleData.json";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id: "1",
  name: "Animesh",
};

const Chat = () => {
  // const containerRef = userRef(null);
  return (
    <>
      <Stack
        direction={"column"}
        bgcolor={"rgba(17, 27, 33, .2)"}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overFlowY: "auto",
          // backgroundImage: "linear-gradient(to bottom, var(--WDS-app-wash, var(--app-background)), var(--WDS-app-wash, var(--app-background-deeper)))"
        }}
      >
        {sampleData.messages.map((message) => (
          <MessageComponent key={message._id} message={message} user={user} />
        ))}
      </Stack>

      <form style={{ height: "10%" }}>
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
              "& .MuiFilledInput-underline:before": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottom: "none",
              },
              "& .MuiFilledInput-root:hover:before": {
                borderBottom: "none",
              },
              // '& .MuiFilledInput-root.Mui-focused:after': {
              //   borderBottom: 'none',
              // }
            }}
          />

          <IconButton type="submit" sx={{ margin: "0.1rem" }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </>
  );
};

export default Chat;
