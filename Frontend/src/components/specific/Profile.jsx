import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import {Face as FaceIcon, AlternateEmail as UsernameIcon, CalendarMonth as CalendarIcon, ArrowBack as BackIcon} from '@mui/icons-material'
import moment from "moment";
import { transformImage } from "../../lib/features";

const Profile = () => {
  const backButton = () => {
    alert("Back Button");
  }

  return (
    <>
    <Tooltip title={"Close"}> 
      <IconButton sx={{position: "relative", margin:"0.3rem"}} onClick={backButton} ><BackIcon sx={{ color: 'white' }} /></IconButton>
    </Tooltip>
    <Stack spacing={"2rem"} alignItems={"center"} margin={"2rem"}>
      <Avatar
        src={transformImage("https://www.w3schools.com/howto/img_avatar.png")}
        sx={{
          width: "10rem",
          height: "10rem",
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      {/* <h1> slafdas</h1> */}
      <ProfileCard heading={"Bio"} text={"sdfljfjlaksf;dslkjfld asf;l dasjas"} />
      <ProfileCard heading={"Username"} text={"Androhuman"} icon={<UsernameIcon/>} />
      <ProfileCard heading={"Name"} text={"Animesh Sinha"} icon={<FaceIcon/>} />
      <ProfileCard heading={"Joined"} text={moment('2024-01-15T00:00:00.000Z').fromNow()} icon={<CalendarIcon/>} />

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
