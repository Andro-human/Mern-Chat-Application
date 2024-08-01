import { Stack, Typography, useMediaQuery } from "@mui/material";
import {Chat as ChatIcon} from "@mui/icons-material"
import {useTheme} from "@mui/material/styles";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}
      height={"100%"}
      sx={{
        background: "rgba(17, 27, 33, .2)",
        }}
    >
      <ChatIcon sx={{fontSize: "10rem"}}/>
      <Typography variant={isMobile?"h5":"h4"}> Welcome to the Chat App</Typography>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a friend to chat
      </Typography>
    </Stack>
  );
};

export default Home;
