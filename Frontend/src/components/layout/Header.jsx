import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery
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
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Search from "../specific/Search";
// import NewGroup from "../specific/NewGroup";
// import Notifications from "../specific/Notifications";

const Header = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [isSearch, setIsSearch] = useState(false);
  // const [isNewGroup, setIsNewGroup] = useState(false);
  // const [isNotification, setIsNotification] = useState(false);
  // const [isM]

  const handleMobile = () => {
    alert("Mobile Menu");
  }
  const logoClick = () => {
    navigate("/");
  };

  const openSearch = () => {
    setIsSearch((prev) => !prev);
  };

  // const openNewGroup = () => {
  //   setIsNewGroup((prev) => !prev);
  // };

  // const navigateToGroup = () => {
  //   navigate("/group");
  // };

  // const openNotification = () => {
  //   setIsNotification((prev) => !prev);
  // };

  const logoutHandler = () => {
    alert("Logout");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#453F3C" }}>
          <Toolbar>
            <Button sx={{ color: "white" }} onClick={logoClick}>
              <Typography variant={isMobile?"subtitle1":"h6"}>Chat Application</Typography>
            </Button>

            
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

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
