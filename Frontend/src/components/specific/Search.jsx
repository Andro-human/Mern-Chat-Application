import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import {Search as SearchIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import UserItem from "../shared/UserItem";
// import sampleData from "../../constants/sampleData.json";
import { useDispatch, useSelector } from "react-redux";
import { setisSearch } from "../../redux/reducers/misc";
import {
  useLazySearchUserQuery,
  useMyConversationsQuery,
} from "../../redux/api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'

const Search = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchUser] = useLazySearchUserQuery(search);
  const { refetch } = useMyConversationsQuery("");
  // console.log(search)
  // const [isSearch] = useLazySearchUserQuery()
  console.log("In Search component");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      // dispatch(setisSearch(true));
      searchUser(search)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
      // .catch(e) => console.log(e);
    }, 1000);
    return () => clearTimeout(timeOutId); // Cleanup function to clear the timeout
  }, [search, searchUser]);

  // console.log(open)
  // let isLoadingStartConvo = false;
  const startconversationHandler = (id) => {
    // alert(`Start conersation with ${id}`);
    if (loading) {
      toast.error("Please Wait!")
      return;
    }
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_SERVER}api/v1/conversations/create`,
        { otherMemberId: id },
        { withCredentials: true }
      )
      .then((res) => {
        const conversationId = res.data.conversation._id;
        navigate(`/chat/${conversationId}`);
        dispatch(setisSearch(false));
        refetch();
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  const handleClose = () => {
    dispatch(setisSearch(false));
  };
  return (
    <Dialog
      open={isSearch}
      onClose={handleClose}
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
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
