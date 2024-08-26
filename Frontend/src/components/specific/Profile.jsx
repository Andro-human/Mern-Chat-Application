import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalendarIcon,
  ArrowBack as BackIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";
import PropTypes from "prop-types";

const Profile = ({ user }) => {
  // const backButton = () => {
  //   alert("Back Button");
  // }

  return (
    <>
      {/* <Toolbar sx={{bgcolor:"#453F3C"}}></Toolbar> */}
      {/* <Tooltip title={"Close"}> 
      <IconButton sx={{position: "relative", margin:"0.3rem"}} onClick={backButton} ><BackIcon sx={{ color: 'white' }} /></IconButton>
    </Tooltip> */}
      <Stack spacing={"2rem"} alignItems={"center"} margin={"2rem"}>
        <Avatar
          src={
            user?.avatar?.url ||
            "https://www.w3schools.com/howto/img_avatar.png"
          }
          sx={{
            width: "10rem",
            height: "10rem",
            objectFit: "contain",
            marginBottom: "1rem",
            border: "5px solid white",
          }}
        />
        {/* <h1> slafdas</h1> */}
        <ProfileCard heading={"Bio"} text={user?.bio} />
        <ProfileCard
          heading={"Username"}
          text={user?.username}
          icon={<UsernameIcon />}
        />
        <ProfileCard heading={"Name"} text={user?.name} icon={<FaceIcon />} />
        <ProfileCard
          heading={"Joined"}
          text={moment(user?.createdAt).fromNow()}
          icon={<CalendarIcon />}
        />
      </Stack>
    </>
  );
};

const ProfileCard = ({ text, icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >
      {icon}
      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default Profile;
