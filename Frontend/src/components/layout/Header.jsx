import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Search as SearchIcon,
  // Add as AddIcon,
  // Group as GroupIcon,
  // Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Search from "../specific/Search";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, userNotExists } from "../../redux/reducers/auth";
import { setisMobile, setisSearch } from "../../redux/reducers/misc";
import { useTheme } from "@mui/material/styles";
// import NewGroup from "../specific/NewGroup";
// import Notifications from "../specific/Notifications";

const Header = ({socket}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const theme = useTheme();
  const heading = useMediaQuery(theme.breakpoints.down("sm"));
  
  const {isSearch} = useSelector((state) => state.misc);

  // const [isNewGroup, setIsNewGroup] = useState(false);
  // const [isNotification, setIsNotification] = useState(false);
  // const [isM]

  const handleMobile = () => {
    dispatch(setisMobile(true));
  };

  const logoClick = () => {
    navigate("/");
  };

  const openSearch = () => {
    dispatch(setisSearch(true));
    // setIsSearch((prev) => !prev);
  };

  const logoutHandler = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}api/v1/auth/logout`,
        {
          withCredentials: true,
        }
      );
      dispatch(userNotExists());
      socket.disconnect();
      setTimeout(() => {
        toast.success(data?.message);
      }, 500);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error Occurred during logout"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#453F3C" }}>
          <Toolbar>
          <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Button sx={{ color: "white" }} onClick={logoClick}>
              <Typography variant={heading ? "subtitle1" : "h6"}>
                Chat Application
              </Typography>
            </Button>

            

            <Box sx={{ flexGrow: 1 }}></Box>
            <Box>
              <IconBtn
                title="Search"
                icon={<SearchIcon />}
                onClick={openSearch}
              />
              {/* <IconBtn
                title="New Group"
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title="Manage Group"
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title="Notifications"
                icon={<NotificationsIcon />}
                onClick={openNotification}
              /> */}

              <IconBtn
                title="Logout"
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && <Search />}
      {/* {isNewGroup&& <NewGroup />}
      {isNotification && <Notifications />} */}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
