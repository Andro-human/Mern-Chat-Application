import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import UserItem from "../shared/UserItem";
import sampleData from "../../constants/sampleData.json";

const Search = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(sampleData.users);
  // const [open, setOpen] = useState(true);

  // console.log(open)
  let isLoadingStartConvo = false;
  const startconversationHandler = (id) => {
    alert(`Start conversation with ${id}`);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // }
  return (
    <Dialog
      open={open}
      // onClose={handleClose}
      // BackdropProps={{
      //   onClick: { handleClose }, // Closes dialog when clicking on the backdrop
      // }}
    >
      <Stack
        p={"2rem"}
        direction={"column"}
        width={isMobile ? "20em" : "25rem"}
        textAlign={"center"}
      >
        <DialogTitle>Find Your Friends!</DialogTitle>
        <TextField
          label={"Search"}
          variant={"outlined"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={startconversationHandler}
              handlerIsLoading={isLoadingStartConvo}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
