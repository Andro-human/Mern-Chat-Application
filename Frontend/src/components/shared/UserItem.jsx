import { memo } from "react";
import { Avatar, Box, IconButton, ListItem, Stack, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const UserItem = ({ user, handler }) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem key={_id} >
      <Stack width={"100%"} direction={"row"} spacing={"1rem"} sx={{ alignItems: "center" }} >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        
        <IconButton sx={{
            bgcolor:"primary.main",
            color:"white",
            "&:hover": {
                bgcolor: "primary.dark"
            }
        }} onClick={() => handler(_id)}>
          <AddIcon />
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
